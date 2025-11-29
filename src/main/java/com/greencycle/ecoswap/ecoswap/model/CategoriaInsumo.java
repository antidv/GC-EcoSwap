package com.greencycle.ecoswap.ecoswap.model;

import lombok.Getter;

@Getter
public enum CategoriaInsumo {
    // Nombre   | Aprov. | Emisión (CO2) | Agua
    PAPEL       (0.85,   0.9,            26.0),
    CARTON      (0.90,   1.1,            24.0),
    PLASTICO    (0.70,   1.5,            5.7),
    VIDRIO      (0.95,   0.3,            1.3),
    METAL       (0.95,   4.0,            50.0),
    ORGANICO    (0.35,   0.4,            0.0);

    private final double factorAprovechamiento;
    private final double factorEmision;
    private final double factorAgua;

    CategoriaInsumo(double factorAprovechamiento, double factorEmision, double factorAgua) {
        this.factorAprovechamiento = factorAprovechamiento;
        this.factorEmision = factorEmision;
        this.factorAgua = factorAgua;
    }

    // Método auxiliar para buscar ignorando mayúsculas/tildes si viene sucio de la BD
    public static CategoriaInsumo buscar(String texto) {
        try {
            // Normalizamos texto: Quitar tildes y mayúsculas podría ser necesario,
            // pero por ahora asumimos que el Admin selecciona de una lista exacta.
            return CategoriaInsumo.valueOf(texto.toUpperCase().replace("Ó", "O").replace("Á", "A"));
        } catch (IllegalArgumentException e) {
            return PLASTICO; // Valor por defecto si no coincide
        }
    }
}