package com.greencycle.ecoswap.ecoswap.repository;

import com.greencycle.ecoswap.ecoswap.model.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CertificadoRepository extends JpaRepository<Certificado, Integer> {

    // Buscar certificado por el ID de la orden (para ver si ya existe o mostrarlo)
    Optional<Certificado> findByOrdenId(Integer ordenId);

    // Verificar si existe (para no crear duplicados)
    boolean existsByOrdenId(Integer ordenId);
}