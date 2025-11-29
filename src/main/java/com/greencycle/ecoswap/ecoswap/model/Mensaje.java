package com.greencycle.ecoswap.ecoswap.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "mensajes")
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "orden_id", nullable = false)
    private Orden orden; // Vinculado a la orden específica

    @ManyToOne
    @JoinColumn(name = "remitente_id", nullable = false)
    private Usuario remitente;

    // No ponemos destinatario obligatorio, se asume que es el otro participante de la orden

    @Column(nullable = false)
    private String contenido;

    private LocalDateTime fechaEnvio = LocalDateTime.now();
}