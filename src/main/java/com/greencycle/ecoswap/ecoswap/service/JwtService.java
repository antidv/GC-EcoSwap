package com.greencycle.ecoswap.ecoswap.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    // IMPORTANTE: Esta llave debe ser larga y segura. En producción iría en application.properties.
    // Tiene que tener al menos 32 caracteres para el algoritmo HS256.
    private static final String SECRET_KEY = "ecoswap_secret_key_super_segura_para_el_proyecto_2025";

    // Generar el Token
    public String generateToken(String email, String rol) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", rol); // Agregamos el rol dentro del token para usarlo en el Front

        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // El "sujeto" es el email
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Dura 10 horas
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}