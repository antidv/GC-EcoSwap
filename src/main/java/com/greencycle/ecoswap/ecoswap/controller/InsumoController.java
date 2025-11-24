package com.greencycle.ecoswap.ecoswap.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greencycle.ecoswap.ecoswap.model.Insumo;
import com.greencycle.ecoswap.ecoswap.repository.InsumoRepository;

@RestController
@RequestMapping("/api/insumos")
@CrossOrigin(origins = "*") 
public class InsumoController {

    @Autowired
    private InsumoRepository insumoRepository;

    @PostMapping
    public ResponseEntity<Insumo> crearInsumo(@RequestBody Insumo insumo) {
        // Aseguramos que por defecto nazca como privado si viene nulo
        if (insumo.getEstado() == null) {
            insumo.setEstado("PRIVADO");
        }
        Insumo nuevoInsumo = insumoRepository.save(insumo);
        return ResponseEntity.ok(nuevoInsumo);
    }

    @GetMapping
    public List<Insumo> listarTodos() {
        return insumoRepository.findAll();
    }

    @GetMapping("/publicos")
    public List<Insumo> listarPublicos() {
        return insumoRepository.findByEstado("DISPONIBLE");
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(@PathVariable Integer id) {
        Optional<Insumo> insumoOpt = insumoRepository.findById(id);

        if (insumoOpt.isPresent()) {
            Insumo insumo = insumoOpt.get();
            
            // Lógica de toggle simple
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