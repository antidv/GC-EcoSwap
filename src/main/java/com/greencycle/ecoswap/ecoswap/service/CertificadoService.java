package com.greencycle.ecoswap.ecoswap.service;

import com.greencycle.ecoswap.ecoswap.dto.CertificadoResponse;
import com.greencycle.ecoswap.ecoswap.model.*;
import com.greencycle.ecoswap.ecoswap.repository.CertificadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CertificadoService {

    @Autowired
    private CertificadoRepository certificadoRepository;

    // 1. Generar y Guardar en BD
    public void generarCertificado(Orden orden) {
        if (certificadoRepository.existsByOrdenId(orden.getId())) {
            return;
        }

        Certificado cert = new Certificado();
        cert.setOrden(orden);
        cert.setCodigoUnico(UUID.randomUUID().toString().toUpperCase());
        cert.setNombreComprador(orden.getUsuario().getNombreEmpresa());
        cert.setNombreVendedor("GreenCycle Perú S.A.C.");
        cert.setInversionTotal(orden.getMontoTotal());

        // Variables acumuladoras
        BigDecimal totalResiduosEvitados = BigDecimal.ZERO;
        BigDecimal totalCo2 = BigDecimal.ZERO;
        BigDecimal totalAgua = BigDecimal.ZERO;

        // Iterar sobre cada producto comprado
        for (DetalleOrden detalle : orden.getDetalles()) {
            Insumo insumo = detalle.getInsumo();

            // Buscar la categoría en el Enum (Plástico, Vidrio, etc.)
            CategoriaInsumo catEnum = CategoriaInsumo.buscar(insumo.getCategoria());

            BigDecimal cantidadVendida = detalle.getCantidadComprada();

            // FÓRMULA 1: Residuos Evitados = Vendidos * Factor Aprov.
            BigDecimal factorAprov = BigDecimal.valueOf(catEnum.getFactorAprovechamiento());
            BigDecimal evitadoItem = cantidadVendida.multiply(factorAprov);

            // FÓRMULA 2: CO2 = Residuos Evitados * Factor Emisión
            BigDecimal factorEmision = BigDecimal.valueOf(catEnum.getFactorEmision());
            BigDecimal co2Item = evitadoItem.multiply(factorEmision);

            // FÓRMULA 3: Agua = Residuos Evitados * Factor Agua
            BigDecimal factorAgua = BigDecimal.valueOf(catEnum.getFactorAgua());
            BigDecimal aguaItem = evitadoItem.multiply(factorAgua);

            // Sumar al total general del certificado
            totalResiduosEvitados = totalResiduosEvitados.add(evitadoItem);
            totalCo2 = totalCo2.add(co2Item);
            totalAgua = totalAgua.add(aguaItem);
        }

        cert.setResiduosEvitadosKg(totalResiduosEvitados.setScale(2, RoundingMode.HALF_UP));
        cert.setCo2Ahorrado(totalCo2.setScale(2, RoundingMode.HALF_UP));
        cert.setAguaPreservada(totalAgua.setScale(2, RoundingMode.HALF_UP));

        // Cálculo estimado de Ahorro Económico (Si no hay fórmula, asumimos un % del costo o valor simbólico)
        // Por ahora lo dejaremos como el 20% de la inversión (supuesto de ahorro vs materia prima virgen)
        cert.setAhorroEconomicoEstimado(orden.getMontoTotal().multiply(new BigDecimal("0.20")).setScale(2, RoundingMode.HALF_UP));

        certificadoRepository.save(cert);
    }

    // 2. Obtener DTO para el Frontend
    public CertificadoResponse obtenerDatosCertificado(Integer ordenId) {
        Certificado cert = certificadoRepository.findByOrdenId(ordenId)
                .orElseThrow(() -> new RuntimeException("Certificado no encontrado"));

        CertificadoResponse response = new CertificadoResponse();
        response.setCodigoVerificacion(cert.getCodigoUnico());
        response.setIdTransaccion(cert.getOrden().getId());
        response.setComprador(cert.getNombreComprador());
        response.setRucComprador(cert.getOrden().getUsuario().getRuc());
        response.setInversionTotal(cert.getInversionTotal());

        response.setResiduosEvitados(cert.getResiduosEvitadosKg());
        response.setCo2Ahorrado(cert.getCo2Ahorrado());
        response.setAguaPreservada(cert.getAguaPreservada());
        response.setAhorroEconomico(cert.getAhorroEconomicoEstimado());
        response.setFechaEmision(cert.getFechaEmision());

        // Generar lista bonita de insumos: ["100kg Plástico", "20kg Cartón"]
        List<String> resumen = cert.getOrden().getDetalles().stream()
                .map(d -> d.getCantidadComprada() + "kg " + d.getInsumo().getNombre())
                .collect(Collectors.toList());
        response.setResumenInsumos(resumen);

        return response;
    }
}