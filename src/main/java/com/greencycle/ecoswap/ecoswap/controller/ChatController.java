package com.greencycle.ecoswap.ecoswap.controller;

import com.greencycle.ecoswap.ecoswap.dto.MensajeRequest;
import com.greencycle.ecoswap.ecoswap.model.Mensaje;
import com.greencycle.ecoswap.ecoswap.model.Orden;
import com.greencycle.ecoswap.ecoswap.model.Usuario;
import com.greencycle.ecoswap.ecoswap.repository.MensajeRepository;
import com.greencycle.ecoswap.ecoswap.repository.OrdenRepository;
import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private MensajeRepository mensajeRepository;
    @Autowired
    private OrdenRepository ordenRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    // GET: Historial
    @GetMapping("/{ordenId}")
    public List<Mensaje> obtenerMensajes(@PathVariable Integer ordenId) {
        return mensajeRepository.findByOrdenIdOrderByFechaEnvioAsc(ordenId);
    }

    // POST: Enviar Mensaje
    @PostMapping
    public ResponseEntity<?> enviarMensaje(@RequestBody MensajeRequest request) {
        Orden orden = ordenRepository.findById(request.getOrdenId())
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        // 1. Validar estado (Solo PENDIENTE)
        if (!"PENDIENTE".equals(orden.getEstado())) {
            return ResponseEntity.badRequest().body("Chat cerrado. Orden en estado: " + orden.getEstado());
        }

        Usuario remitente = usuarioRepository.findById(request.getRemitenteId())
                .orElseThrow(() -> new RuntimeException("Remitente no encontrado"));

        // 2. Lógica para determinar el Destinatario Automáticamente
        Usuario destinatario;

        // Obtenemos al dueño de la orden (El Reciclador)
        Usuario duenoOrden = orden.getUsuario();

        if (remitente.getId().equals(duenoOrden.getId())) {
            // Si el remitente es el reciclador -> Destinatario es el Admin
            destinatario = usuarioRepository.findByRol("ADMIN")
                    .stream().findFirst()
                    .orElseThrow(() -> new RuntimeException("No hay Admin registrado para responder"));
        } else {
            // Si el remitente NO es el reciclador (es el Admin) -> Destinatario es el Reciclador
            destinatario = duenoOrden;
        }

        Mensaje mensaje = new Mensaje();
        mensaje.setOrden(orden);
        mensaje.setRemitente(remitente);
        mensaje.setDestinatario(destinatario);
        mensaje.setContenido(request.getContenido());
        mensaje.setFechaEnvio(LocalDateTime.now());

        return ResponseEntity.ok(mensajeRepository.save(mensaje));
    }
}