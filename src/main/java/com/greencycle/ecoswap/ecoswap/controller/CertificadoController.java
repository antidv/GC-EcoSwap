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

    // Obtener los datos calculados de una orden finalizada
    @GetMapping("/{ordenId}")
    public ResponseEntity<CertificadoResponse> obtenerCertificado(@PathVariable Long ordenId) {
        try {
            CertificadoResponse response = certificadoService.obtenerDatosCertificado(Math.toIntExact(ordenId));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}