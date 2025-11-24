package com.greencycle.ecoswap.ecoswap.controller;

import com.greencycle.ecoswap.ecoswap.dto.OrdenRequest;
import com.greencycle.ecoswap.ecoswap.model.DetalleOrden;
import com.greencycle.ecoswap.ecoswap.model.Insumo;
import com.greencycle.ecoswap.ecoswap.model.Orden;
import com.greencycle.ecoswap.ecoswap.model.Usuario;
import com.greencycle.ecoswap.ecoswap.repository.InsumoRepository;
import com.greencycle.ecoswap.ecoswap.repository.OrdenRepository;
import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = "*")
public class OrdenController {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // CREAR UNA ORDEN (CHECKOUT)
    @PostMapping
    @Transactional // Importante: Si algo falla a la mitad, revierte todo (no descuenta stock ni guarda orden)
    public ResponseEntity<?> crearOrden(@RequestBody OrdenRequest request) {

        // 1. Verificar Usuario
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Crear el objeto Orden
        Orden orden = new Orden();
        orden.setUsuario(usuario);
        orden.setDireccionEntrega(request.getDireccionEntrega());
        orden.setCciPago(request.getCciPago());
        orden.setEstado("PENDIENTE");
        orden.setCodigoConfirmacion(UUID.randomUUID().toString().substring(0, 8).toUpperCase()); // Código único corto
        orden.setFechaCompra(LocalDateTime.now());

        BigDecimal montoTotalCalculado = BigDecimal.ZERO;

        // 3. Procesar cada item del pedido
        for (OrdenRequest.ItemPedido item : request.getItems()) {
            Insumo insumo = insumoRepository.findById(item.getInsumoId())
                    .orElseThrow(() -> new RuntimeException("Insumo no encontrado: ID " + item.getInsumoId()));

            // Validar Stock
            if (insumo.getCantidadKg().compareTo(item.getCantidad()) < 0) {
                return ResponseEntity.badRequest().body("Stock insuficiente para: " + insumo.getNombre());
            }

            // RESTAR STOCK (Lógica de negocio clave)
            insumo.setCantidadKg(insumo.getCantidadKg().subtract(item.getCantidad()));

            // Si el stock llega a 0, cambiar estado a VENDIDO
            if (insumo.getCantidadKg().compareTo(BigDecimal.ZERO) == 0) {
                insumo.setEstado("VENDIDO");
            }
            insumoRepository.save(insumo); // Actualizar insumo en BD

            // Crear Detalle
            DetalleOrden detalle = new DetalleOrden();
            detalle.setOrden(orden);
            detalle.setInsumo(insumo);
            detalle.setCantidadComprada(item.getCantidad());
            detalle.setPrecioUnitario(insumo.getPrecioPorKg()); // Guardamos el precio al momento de la compra

            // Calcular subtotal y sumar al total
            BigDecimal subtotal = insumo.getPrecioPorKg().multiply(item.getCantidad());
            montoTotalCalculado = montoTotalCalculado.add(subtotal);

            // Agregar a la lista de la orden
            orden.getDetalles().add(detalle);
        }

        orden.setMontoTotal(montoTotalCalculado);

        // 4. Guardar Orden (y detalles en cascada)
        Orden nuevaOrden = ordenRepository.save(orden);

        return ResponseEntity.ok(nuevaOrden);
    }

    // LISTAR ORDENES (Para el Admin)
    @GetMapping
    public List<Orden> listarTodas() {
        return ordenRepository.findAll();
    }

    // LISTAR MIS ORDENES (Para la Recicladora)
    @GetMapping("/mis-ordenes/{usuarioId}")
    public List<Orden> listarPorUsuario(@PathVariable Long usuarioId) {
        return ordenRepository.findByUsuarioId(usuarioId);
    }
}