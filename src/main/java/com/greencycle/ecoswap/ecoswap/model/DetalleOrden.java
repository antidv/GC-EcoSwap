package com.greencycle.ecoswap.ecoswap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "detalle_orden")
public class DetalleOrden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "orden_id", nullable = false)
    @JsonIgnore // Evita bucles infinitos al convertir a JSON
    private Orden orden;

    @ManyToOne
    @JoinColumn(name = "insumo_id", nullable = false)
    private Insumo insumo;

    @Column(name = "cantidad_comprada", nullable = false)
    private BigDecimal cantidadComprada;

    @Column(name = "precio_unitario", nullable = false)
    private BigDecimal precioUnitario;
}