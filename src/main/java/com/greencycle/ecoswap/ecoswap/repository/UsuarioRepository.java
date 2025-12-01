package com.greencycle.ecoswap.ecoswap.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.greencycle.ecoswap.ecoswap.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByRuc(String ruc);
    boolean existsByEmail(String email);
    List<Usuario> findByRol(String rol);
}