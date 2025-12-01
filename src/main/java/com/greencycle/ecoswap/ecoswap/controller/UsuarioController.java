package com.greencycle.ecoswap.ecoswap.controller;

import com.greencycle.ecoswap.ecoswap.dto.UsuarioUpdate;
import com.greencycle.ecoswap.ecoswap.dto.PasswordUpdate;
import com.greencycle.ecoswap.ecoswap.dto.EmailUpdate;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.greencycle.ecoswap.ecoswap.model.Usuario;
import com.greencycle.ecoswap.ecoswap.repository.OrdenRepository;
import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Lista de estados que BLOQUEAN la edición/eliminación
    private final List<String> ESTADOS_ACTIVOS = Arrays.asList("PENDIENTE", "PREPARANDO", "EN_CAMINO");

    // 1. OBTENER PERFIL
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPerfil(@PathVariable Integer id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        // Por seguridad, podríamos limpiar el password antes de enviarlo,
        // pero como es JSON, basta con no mostrarlo en el front o usar @JsonIgnore en la Entidad
        return ResponseEntity.ok(usuario);
    }

    // 2. ACTUALIZAR PERFIL (Con restricción)
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPerfil(@PathVariable Integer id, @RequestBody UsuarioUpdate request) {
        Optional<Usuario> userOpt = usuarioRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuario = userOpt.get();

        // VALIDACIÓN DE REGLA DE NEGOCIO:
        // "No modificar dirección ni datos clave si hay pedidos en curso"
        boolean tienePedidosActivos = ordenRepository.existsByUsuarioIdAndEstadoIn(Integer.valueOf(id), ESTADOS_ACTIVOS);

        if (tienePedidosActivos) {
            return ResponseEntity.badRequest()
                    .body("No puedes editar tu perfil porque tienes órdenes activas (Pendientes o En Camino).");
        }

        // Si pasa la validación, actualizamos
        if (request.getNombreEmpresa() != null) usuario.setNombreEmpresa(request.getNombreEmpresa());
        if (request.getDireccion() != null) usuario.setDireccion(request.getDireccion());
        if (request.getTelefono() != null) usuario.setTelefono(request.getTelefono());
        if (request.getRuc() != null) usuario.setRuc(request.getRuc());

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Perfil actualizado correctamente.");
    }

    // 3. ELIMINAR CUENTA (Solo Recicladoras)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCuenta(@PathVariable Integer id) {
        Optional<Usuario> userOpt = usuarioRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuario = userOpt.get();

        // No permitir borrar al Admin principal
        if ("ADMIN".equals(usuario.getRol())) {
            return ResponseEntity.badRequest().body("No se puede eliminar la cuenta de Administrador.");
        }

        // VALIDACIÓN DE PEDIDOS ACTIVOS
        boolean tienePedidosActivos = ordenRepository.existsByUsuarioIdAndEstadoIn(Long.valueOf(id), ESTADOS_ACTIVOS);

        if (tienePedidosActivos) {
            return ResponseEntity.badRequest()
                    .body("No puedes eliminar tu cuenta mientras tengas pedidos en proceso.");
        }

        usuarioRepository.delete(usuario);
        return ResponseEntity.ok("Cuenta eliminada correctamente.");
    }

    // 4. CAMBIAR CONTRASEÑA
    @PutMapping("/{id}/password")
    public ResponseEntity<?> cambiarPassword(@PathVariable Integer id, @RequestBody PasswordUpdate request) {
        Optional<Usuario> userOpt = usuarioRepository.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        Usuario usuario = userOpt.get();

        // 1. Verificar que la contraseña actual sea correcta
        if (!passwordEncoder.matches(request.getPasswordActual(), usuario.getPassword())) {
            return ResponseEntity.badRequest().body("La contraseña actual es incorrecta.");
        }

        // 2. Encriptar y guardar la nueva
        usuario.setPassword(passwordEncoder.encode(request.getNuevaPassword()));
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Contraseña actualizada correctamente.");
    }

    // 5. CAMBIAR EMAIL
    @PutMapping("/{id}/email")
    public ResponseEntity<?> cambiarEmail(@PathVariable Integer id, @RequestBody EmailUpdate request) {
        Optional<Usuario> userOpt = usuarioRepository.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        Usuario usuario = userOpt.get();

        // 1. Verificar identidad con contraseña
        if (!passwordEncoder.matches(request.getPasswordActual(), usuario.getPassword())) {
            return ResponseEntity.badRequest().body("La contraseña es incorrecta, no se puede cambiar el email.");
        }

        // 2. Verificar que el nuevo email no exista ya en la BD (Evitar duplicados)
        if (usuarioRepository.existsByEmail(request.getNuevoEmail())) {
            return ResponseEntity.badRequest().body("El nuevo correo electrónico ya está en uso por otro usuario.");
        }

        // 3. Actualizar
        usuario.setEmail(request.getNuevoEmail());
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Email actualizado correctamente.");
    }
}
