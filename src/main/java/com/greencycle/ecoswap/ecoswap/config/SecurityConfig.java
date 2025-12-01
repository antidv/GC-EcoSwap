package com.greencycle.ecoswap.ecoswap.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor 
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService; 

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) 
            .authorizeHttpRequests(auth -> auth
                // 1. Públicos
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/insumos/publicos").permitAll()

                // 2. CHAT
                .requestMatchers("/api/chat/**").permitAll()

                // 3. Admin Insumos (Cambiamos a Authority por seguridad)
                .requestMatchers(HttpMethod.POST, "/api/insumos").hasAnyAuthority("ADMIN", "ROLE_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/insumos/**").hasAnyAuthority("ADMIN", "ROLE_ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/insumos").hasAnyAuthority("ADMIN", "ROLE_ADMIN")

                // 4. Recicladora
                .requestMatchers("/api/carrito/**").hasAnyAuthority("RECICLADORA", "ROLE_RECICLADORA")
                .requestMatchers(HttpMethod.POST, "/api/ordenes").hasAnyAuthority("RECICLADORA", "ROLE_RECICLADORA")
                .requestMatchers(HttpMethod.GET, "/api/ordenes/mis-ordenes/**").hasAnyAuthority("RECICLADORA", "ROLE_RECICLADORA")

                // 5. Admin Ordenes
                .requestMatchers(HttpMethod.GET, "/api/ordenes").hasAnyAuthority("ADMIN", "ROLE_ADMIN")

                // 6. Actualizar estado (Ambos)
                .requestMatchers(HttpMethod.PUT, "/api/ordenes/**").hasAnyAuthority("ADMIN", "RECICLADORA", "ROLE_ADMIN", "ROLE_RECICLADORA")

                .requestMatchers(HttpMethod.DELETE, "/api/insumos/**").hasRole("ADMIN")

                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); 
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}