package com.greencycle.ecoswap.ecoswap.controller;

import com.greencycle.ecoswap.ecoswap.dto.OrdenRequest;
import com.greencycle.ecoswap.ecoswap.model.DetalleOrden;
import com.greencycle.ecoswap.ecoswap.model.Insumo;
import com.greencycle.ecoswap.ecoswap.model.Orden;
import com.greencycle.ecoswap.ecoswap.model.Usuario;
import com.greencycle.ecoswap.ecoswap.model.CarritoItem;
import com.greencycle.ecoswap.ecoswap.repository.InsumoRepository;
import com.greencycle.ecoswap.ecoswap.repository.OrdenRepository;
import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;
import com.greencycle.ecoswap.ecoswap.repository.CarritoItemRepository;
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

    @Autowired
    private CarritoItemRepository carritoRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> crearOrden(@RequestBody OrdenRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Orden orden = new Orden();
        orden.setUsuario(usuario);
        orden.setDireccionEntrega(request.getDireccionEntrega());
        orden.setCciPago(request.getCciPago());
        orden.setEstado("PENDIENTE");
        orden.setCodigoConfirmacion(UUID.randomUUID().toString().substring(0, 8).toUpperCase()); // Código único corto
        orden.setFechaCompra(LocalDateTime.now());

        BigDecimal montoTotalCalculado = BigDecimal.ZERO;

        for (OrdenRequest.ItemPedido item : request.getItems()) {
            Insumo insumo = insumoRepository.findById(item.getInsumoId())
                    .orElseThrow(() -> new RuntimeException("Insumo no encontrado: ID " + item.getInsumoId()));

            if (insumo.getCantidadKg().compareTo(item.getCantidad()) < 0) {
                return ResponseEntity.badRequest().body("Stock insuficiente para: " + insumo.getNombre());
            }

            insumo.setCantidadKg(insumo.getCantidadKg().subtract(item.getCantidad()));

            if (insumo.getCantidadKg().compareTo(BigDecimal.ZERO) == 0) {
                insumo.setEstado("VENDIDO");
            }
            insumoRepository.save(insumo);

            DetalleOrden detalle = new DetalleOrden();
            detalle.setOrden(orden);
            detalle.setInsumo(insumo);
            detalle.setCantidadComprada(item.getCantidad());
            detalle.setPrecioUnitario(insumo.getPrecioPorKg());

            BigDecimal subtotal = insumo.getPrecioPorKg().multiply(item.getCantidad());
            montoTotalCalculado = montoTotalCalculado.add(subtotal);

            orden.getDetalles().add(detalle);
        }

        orden.setMontoTotal(montoTotalCalculado);

        Orden nuevaOrden = ordenRepository.save(orden);

        List<CarritoItem> itemsDelCarrito = carritoRepository.findByUsuario(usuario);
        
        carritoRepository.deleteAll(itemsDelCarrito);

        return ResponseEntity.ok(nuevaOrden);
    }

    @GetMapping
    public List<Orden> listarTodas() {
        return ordenRepository.findAll();
    }

    @GetMapping("/mis-ordenes/{usuarioId}")
    public List<Orden> listarPorUsuario(@PathVariable Integer usuarioId) {
        return ordenRepository.findByUsuarioId(usuarioId);
    }
}