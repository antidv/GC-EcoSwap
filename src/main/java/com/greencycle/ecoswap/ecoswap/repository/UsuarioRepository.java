package com.greencycle.ecoswap.ecoswap.repository;

import com.greencycle.ecoswap.ecoswap.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByRuc(String ruc);
    boolean existsByEmail(String email);
}