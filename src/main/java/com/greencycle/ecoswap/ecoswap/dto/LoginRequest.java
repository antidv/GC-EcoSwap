package com.greencycle.ecoswap.ecoswap.dto;
import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}