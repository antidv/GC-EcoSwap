package com.greencycle.ecoswap.ecoswap.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class InsumoRequest {
    // No ponemos ID ni Fecha, esos se generan solos
    private String nombre;
    private String descripcion;
    private String categoria;
    private BigDecimal cantidadKg;
    private BigDecimal precioPorKg;
    private String imagenUrl; // El front sube la foto a Firebase/Cloudinary y te manda el link
}