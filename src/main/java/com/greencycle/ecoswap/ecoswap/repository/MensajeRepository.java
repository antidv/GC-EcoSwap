package com.greencycle.ecoswap.ecoswap.repository;

import com.greencycle.ecoswap.ecoswap.model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    // Busca los mensajes de una orden específica y los ordena por fecha (el más antiguo primero)
    List<Mensaje> findByOrdenIdOrderByFechaEnvioAsc(Integer ordenId);
}
