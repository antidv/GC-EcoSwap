package com.greencycle.ecoswap.ecoswap.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.greencycle.ecoswap.ecoswap.model.CarritoItem;
import com.greencycle.ecoswap.ecoswap.model.Insumo;
import com.greencycle.ecoswap.ecoswap.model.Usuario;

public interface CarritoItemRepository extends JpaRepository<CarritoItem, Integer> {
    
    // Listar todos los items del carrito de un usuario
    List<CarritoItem> findByUsuario(Usuario usuario);

    // Buscar si ya existe un producto específico en el carrito de este usuario
    Optional<CarritoItem> findByUsuarioAndInsumo(Usuario usuario, Insumo insumo);
    
    // Borrar todo el carrito de un usuario (útil para cuando se confirma la compra)
    void deleteByUsuario(Usuario usuario);
}