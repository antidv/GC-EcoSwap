package com.greencycle.ecoswap.ecoswap.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CarritoRequest{
    private Integer insumoId;
    private BigDecimal cantidad;

    public Integer getInsumoId() {
        return insumoId;
    }

    public void setInsumoId(Integer insumoId) {
        this.insumoId = insumoId;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
    
}