package com.greencycle.ecoswap.ecoswap.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CertificadoResponse {
    private String codigoVerificacion; // UUID
    private Integer idTransaccion;        // ID Orden
    private String comprador;
    private String rucComprador;
    private BigDecimal inversionTotal;

    // Detalles ambientales
    private BigDecimal residuosEvitados;
    private BigDecimal co2Ahorrado;
    private BigDecimal aguaPreservada;
    private BigDecimal ahorroEconomico;

    private LocalDateTime fechaEmision;

    private List<String> resumenInsumos;
}