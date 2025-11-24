package com.greencycle.ecoswap.ecoswap.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String rol; // "ADMIN" o "RECICLADORA"

    @Column(name = "nombre_empresa")
    private String nombreEmpresa;

    @Column(unique = true, length = 11)
    private String ruc;

    private String direccion;

    private String telefono;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro = LocalDateTime.now();
}