package com.greencycle.ecoswap.ecoswap.controller;

import com.greencycle.ecoswap.ecoswap.dto.CarritoRequest;
import com.greencycle.ecoswap.ecoswap.model.CarritoItem;
import com.greencycle.ecoswap.ecoswap.model.Insumo;
import com.greencycle.ecoswap.ecoswap.model.Usuario;
import com.greencycle.ecoswap.ecoswap.repository.CarritoItemRepository;
import com.greencycle.ecoswap.ecoswap.repository.InsumoRepository;
import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private CarritoItemRepository carritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    // Helper privado para obtener el Usuario actual desde el Token
    private Usuario getUsuarioAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // Spring Security guarda el username/email aquí
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    // 1. Agregar item al carrito (POST)
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarAlCarrito(@RequestBody CarritoRequest request) {
        try {
            Usuario usuario = getUsuarioAutenticado();
            
            // Validar que el insumo exista
            Insumo insumo = insumoRepository.findById(request.getInsumoId())
                    .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

            // Verificar si el usuario YA tiene este insumo en su carrito
            Optional<CarritoItem> itemExistente = carritoRepository.findByUsuarioAndInsumo(usuario, insumo);

            CarritoItem carritoItem;
            if (itemExistente.isPresent()) {
                // Si ya existe, sumamos la cantidad
                carritoItem = itemExistente.get();
                carritoItem.setCantidad(carritoItem.getCantidad().add(request.getCantidad()));
            } else {
                // Si no existe, creamos uno nuevo
                carritoItem = new CarritoItem();
                carritoItem.setUsuario(usuario);
                carritoItem.setInsumo(insumo);
                carritoItem.setCantidad(request.getCantidad());
                carritoItem.setFechaAgregado(LocalDateTime.now());
            }

            carritoRepository.save(carritoItem);
            return ResponseEntity.ok("Producto agregado al carrito");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // 2. Ver mi carrito (GET)
    @GetMapping
    public List<CarritoItem> verMiCarrito() {
        Usuario usuario = getUsuarioAutenticado();
        return carritoRepository.findByUsuario(usuario);
    }

    // 3. Eliminar un item específico (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarItem(@PathVariable Integer id) {
        Usuario usuario = getUsuarioAutenticado();
        Optional<CarritoItem> itemOpt = carritoRepository.findById(id);

        if (itemOpt.isPresent()) {
            CarritoItem item = itemOpt.get();
            // Seguridad: Verificar que el item pertenezca al usuario que intenta borrarlo
            if (!item.getUsuario().getId().equals(usuario.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para borrar este item");
            }
            carritoRepository.delete(item);
            return ResponseEntity.ok("Item eliminado del carrito");
        }
        return ResponseEntity.notFound().build();
    }
}