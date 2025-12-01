package com.greencycle.ecoswap.ecoswap.controller;

import com.greencycle.ecoswap.ecoswap.dto.CertificadoResponse;
import com.greencycle.ecoswap.ecoswap.service.CertificadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/certificados")
@CrossOrigin(origins = "*")
public class CertificadoController {

    @Autowired
    private CertificadoService certificadoService;

    @GetMapping("/{ordenId}")
    public ResponseEntity<CertificadoResponse> obtenerCertificado(@PathVariable Integer ordenId) {
        try {
            CertificadoResponse response = certificadoService.obtenerDatosCertificado(ordenId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}