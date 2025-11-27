package com.greencycle.ecoswap.ecoswap.repository;

import com.greencycle.ecoswap.ecoswap.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrdenRepository extends JpaRepository<Orden, Long> {
    // Para que la recicladora vea su historial
    List<Orden> findByUsuarioId(Integer usuarioId);
}