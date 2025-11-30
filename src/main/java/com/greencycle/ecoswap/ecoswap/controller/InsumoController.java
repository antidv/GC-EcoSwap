package com.greencycle.ecoswap.ecoswap.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greencycle.ecoswap.ecoswap.dto.InsumoRequest;
import com.greencycle.ecoswap.ecoswap.model.CategoriaInsumo;
import com.greencycle.ecoswap.ecoswap.model.Insumo;
import com.greencycle.ecoswap.ecoswap.repository.InsumoRepository;

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

    @GetMapping("/categorias")
    public List<String> listarCategorias() {
        // Convierte los valores del ENUM a una lista de Strings
        // Retornará: ["PAPEL", "CARTON", "PLASTICO", "VIDRIO", "METAL", "ORGANICO"]
        return Arrays.stream(CategoriaInsumo.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    // Editar Insumo completo (PUT) - Solo Admin
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarInsumo(@PathVariable Integer id, @RequestBody InsumoRequest request) {
        Optional<Insumo> insumoOpt = insumoRepository.findById(id);
        if (insumoOpt.isPresent()) {
            Insumo insumo = insumoOpt.get();

            // Actualizamos los campos con lo que viene del Front
            insumo.setNombre(request.getNombre());
            insumo.setDescripcion(request.getDescripcion());
            insumo.setCategoria(request.getCategoria());
            insumo.setCantidadKg(request.getCantidadKg());
            insumo.setPrecioPorKg(request.getPrecioPorKg());
            insumo.setImagenUrl(request.getImagenUrl());
            
            // Nota: No cambiamos la fecha de creación ni el estado (eso se hace con el otro endpoint)
            insumoRepository.save(insumo);
            return ResponseEntity.ok(insumo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar Insumo (DELETE) - Solo Admin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarInsumo(@PathVariable Integer id) {
        if (insumoRepository.existsById(id)) {
            insumoRepository.deleteById(id);
            return ResponseEntity.ok("Insumo eliminado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}