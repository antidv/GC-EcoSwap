package com.greencycle.ecoswap.ecoswap.controller;

import java.util.List;
import java.util.Optional;

import com.greencycle.ecoswap.ecoswap.dto.InsumoRequest;
import com.greencycle.ecoswap.ecoswap.model.Insumo;
import com.greencycle.ecoswap.ecoswap.repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/insumos")
@CrossOrigin(origins = "*")
public class InsumoController {

    @Autowired
    private InsumoRepository insumoRepository;

    @PostMapping
    public ResponseEntity<?> crearInsumo(@RequestBody InsumoRequest request) {
        // Mapeo manual de DTO a Entidad (Simple y efectivo)
        Insumo insumo = new Insumo();
        insumo.setNombre(request.getNombre());
        insumo.setDescripcion(request.getDescripcion());
        insumo.setCategoria(request.getCategoria());
        insumo.setCantidadKg(request.getCantidadKg());
        insumo.setPrecioPorKg(request.getPrecioPorKg());
        insumo.setImagenUrl(request.getImagenUrl());

        // Valores por defecto del sistema
        insumo.setEstado("PRIVADO"); // HU-0001: Guarda pero no publica inmediatamente
        insumo.setFechaCreacion(LocalDateTime.now());

        Insumo nuevoInsumo = insumoRepository.save(insumo);
        return ResponseEntity.ok(nuevoInsumo);
    }

    @GetMapping
    public List<Insumo> listarTodos() {
        return insumoRepository.findAll();
    }

    // Endpoint para que las recicladoras vean solo lo disponible
    @GetMapping("/publicos")
    public List<Insumo> listarPublicos() {
        return insumoRepository.findByEstado("DISPONIBLE");
    }

    // Toggle para publicar/ocultar (HU-0006)
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(@PathVariable Integer id) {
        Optional<Insumo> insumoOpt = insumoRepository.findById(id);

        if (insumoOpt.isPresent()) {
            Insumo insumo = insumoOpt.get();

            // Lógica de toggle
            if ("PRIVADO".equals(insumo.getEstado())) {
                insumo.setEstado("DISPONIBLE");
            } else {
                insumo.setEstado("PRIVADO");
            }

            insumoRepository.save(insumo);
            return ResponseEntity.ok("Estado actualizado a: " + insumo.getEstado());
        }

        return ResponseEntity.notFound().build();
    }
}