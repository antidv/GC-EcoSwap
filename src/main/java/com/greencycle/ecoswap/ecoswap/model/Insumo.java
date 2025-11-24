package com.greencycle.ecoswap.ecoswap.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "insumos")
public class Insumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 50)
    private String categoria;

    @Column(name = "cantidad_kg", nullable = false, precision = 10, scale = 2)
    private BigDecimal cantidadKg;

    @Column(name = "precio_por_kg", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioPorKg;

    // Valores permitidos: 'DISPONIBLE', 'PRIVADO', 'VENDIDO'
    @Column(length = 20)
    private String estado = "PRIVADO"; 

    @Column(name = "imagen_url", columnDefinition = "TEXT")
    private String imagenUrl;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}