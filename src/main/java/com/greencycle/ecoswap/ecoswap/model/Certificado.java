package com.greencycle.ecoswap.ecoswap.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "certificados")
public class Certificado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "orden_id", nullable = false, unique = true)
    private Orden orden;

    @Column(nullable = false, unique = true)
    private String codigoUnico; // UUID

    // Datos instantánea (Snapshot) por si cambian los precios/usuarios en el futuro
    private String nombreComprador;
    private String nombreVendedor; // GreenCycle
    private BigDecimal inversionTotal; // Monto de la orden

    // Métricas Ambientales Detalladas
    private BigDecimal residuosEvitadosKg; // (Material Vendido * Factor Aprov)
    private BigDecimal co2Ahorrado;        // (Residuos Evitados * Factor Emision)
    private BigDecimal aguaPreservada;     // (Residuos Evitados * Factor Agua)

    // Dato económico extra
    private BigDecimal ahorroEconomicoEstimado;

    private LocalDateTime fechaEmision = LocalDateTime.now();
}