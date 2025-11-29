package com.greencycle.ecoswap.ecoswap.controller;

import com.greencycle.ecoswap.ecoswap.model.Mensaje;
import com.greencycle.ecoswap.ecoswap.model.Orden;
import com.greencycle.ecoswap.ecoswap.model.Usuario;
import com.greencycle.ecoswap.ecoswap.repository.MensajeRepository;
import com.greencycle.ecoswap.ecoswap.repository.OrdenRepository;
import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Obtener historial de mensajes de una orden
    @GetMapping("/{ordenId}")
    public List<Mensaje> obtenerMensajes(@PathVariable Integer ordenId) {
        return mensajeRepository.findByOrdenIdOrderByFechaEnvioAsc(ordenId);
    }

    // Enviar mensaje
    @PostMapping
    public Mensaje enviarMensaje(@RequestBody MensajeRequest request) {
        Orden orden = ordenRepository.findById(Math.toIntExact(request.getOrdenId())).orElseThrow();
        Usuario remitente = usuarioRepository.findById(Math.toIntExact(request.getRemitenteId())).orElseThrow();

        Mensaje mensaje = new Mensaje();
        mensaje.setOrden(orden);
        mensaje.setRemitente(remitente);
        mensaje.setContenido(request.getContenido());
        mensaje.setFechaEnvio(LocalDateTime.now());

        return mensajeRepository.save(mensaje);
    }

    // DTO Interno
    @Data
    public static class MensajeRequest {
        private Long ordenId;
        private Long remitenteId;
        private String contenido;
    }
}