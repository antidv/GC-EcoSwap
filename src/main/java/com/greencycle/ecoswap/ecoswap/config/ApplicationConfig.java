package com.greencycle.ecoswap.ecoswap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.greencycle.ecoswap.ecoswap.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UsuarioRepository repository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByEmail(username)
                .map(usuario -> {
                    // Convertimos nuestro Usuario a un UserDetails de Spring
                    return org.springframework.security.core.userdetails.User
                            .withUsername(usuario.getEmail())
                            .password(usuario.getPassword())
                            .roles(usuario.getRol()) // Spring añade "ROLE_" internamente
                            .build();
                })
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }
}