package com.greencycle.ecoswap.ecoswap.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrdenRequest {
    private Integer usuarioId; // Quién compra
    private String direccionEntrega;
    private String cciPago;
    private List<ItemPedido> items; // Lista de productos

    // Clase interna estática para definir los items dentro del JSON
    @Data
    public static class ItemPedido {
        private Integer insumoId;
        private BigDecimal cantidad;
    }
}