package com.greencycle.ecoswap.ecoswap.dto;

import lombok.Data;

@Data
public class MensajeRequest {

    // ID de la orden sobre la cual están negociando
    private Integer ordenId;

    private Integer remitenteId;

    // El texto del mensaje
    private String contenido;
}