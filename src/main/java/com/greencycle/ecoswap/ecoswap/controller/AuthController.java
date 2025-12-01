package com.greencycle.ecoswap.ecoswap.controller;
import com.greencycle.ecoswap.ecoswap.dto.LoginRequest;
import com.greencycle.ecoswap.ecoswap.dto.RegistroRequest;
import com.greencycle.ecoswap.ecoswap.model.Usuario;
import com.greencycle.ecoswap.ecoswap.service.JwtService;
import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // LOGIN (HU-0005)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> userOpt = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            Usuario usuario = userOpt.get();
            // Verificar contraseña encriptada
            if (passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {

                String token = jwtService.generateToken(usuario.getEmail(), usuario.getRol());
                Map<String, Object> response = new HashMap<>();
                response.put("mensaje", "Login exitoso");
                response.put("usuario_id", usuario.getId());
                response.put("rol", usuario.getRol());
                response.put("token", token);
                response.put("nombreEmpresa", usuario.getNombreEmpresa()); 
                response.put("direccion", usuario.getDireccion());
                response.put("telefono", usuario.getTelefono());

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }

    // REGISTRO (HU-0005 - Solo Recicladoras)
    @PostMapping("/register")
    public ResponseEntity<?> registrarRecicladora(@RequestBody RegistroRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }
        if (usuarioRepository.existsByRuc(request.getRuc())) {
            return ResponseEntity.badRequest().body("El RUC ya está registrado");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setEmail(request.getEmail());
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword())); // Encriptar password
        nuevoUsuario.setNombreEmpresa(request.getNombreEmpresa());
        nuevoUsuario.setRuc(request.getRuc());
        nuevoUsuario.setDireccion(request.getDireccion());
        nuevoUsuario.setTelefono(request.getTelefono());
        nuevoUsuario.setRol("RECICLADORA"); // Por defecto siempre es recicladora

        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok("Usuario registrado exitosamente");
    }
}