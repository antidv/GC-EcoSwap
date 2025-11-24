package com.greencycle.ecoswap.ecoswap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencycle.ecoswap.ecoswap.model.Insumo;

// Se usa Integer porque el ID en el modelo es Integer
public interface InsumoRepository extends JpaRepository<Insumo, Integer> {
        List<Insumo> findByEstado(String estado);
}