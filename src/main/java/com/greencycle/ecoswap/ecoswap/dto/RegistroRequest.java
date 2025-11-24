package com.greencycle.ecoswap.ecoswap.dto;
import lombok.Data;

@Data
public class RegistroRequest {
    private String email;
    private String password;
    private String nombreEmpresa;
    private String ruc;
    private String direccion;
    private String telefono;
}