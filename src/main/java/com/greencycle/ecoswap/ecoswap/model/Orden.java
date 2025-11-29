package com.greencycle.ecoswap.ecoswap.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "ordenes")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Relación con el Usuario (Comprador)
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "monto_total", nullable = false)
    private BigDecimal montoTotal;

    @Column(nullable = false)
    private String estado; // PENDIENTE, COMPLETADA, CANCELADA

    @Column(name = "cci_pago")
    private String cciPago;

    @Column(name = "direccion_entrega", nullable = false)
    private String direccionEntrega;

    @Column(name = "codigo_confirmacion")
    private String codigoConfirmacion;

    @Column(name = "fecha_compra")
    private LocalDateTime fechaCompra = LocalDateTime.now();

    // Relación Uno a Muchos: Una orden tiene muchos detalles
    // CascadeType.ALL significa que si guardo la Orden, se guardan sus detalles automáticamente
    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetalleOrden> detalles = new ArrayList<>();
}