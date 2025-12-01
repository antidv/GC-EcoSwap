import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api"; // Importamos tu conexión al backend
import { useReactToPrint } from "react-to-print";
import CertificadoDocumento from "./CertificadoPDF"; // Asegúrate que este nombre coincida con tu archivo
import Header from "../components/Header";
import Footer from "../components/Footer";

function PaginaDescarga() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();

  // 1. Intentamos leer los datos si vienen de la navegación anterior. Si no, iniciamos en null.
  const [transaccion, setTransaccion] = useState(location.state?.datosTransaccion || null);
  const [loading, setLoading] = useState(!transaccion); // Si no hay datos, cargamos.

  const styleButtonPrint = {
    height: "50px"
  };

  // 2. Efecto: Si no tenemos transacción (usuario refrescó la página), la buscamos en el Backend
  useEffect(() => {
    if (transaccion) return; // Si ya tenemos datos, no hacemos nada.

    const fetchDatosCertificado = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/certificados/${id}`);
        const data = response.data;

        // Mismo mapeo que hicimos en la otra página para mantener consistencia
        const datosMapeados = {
            id: data.idTransaccion,
            codigo: data.codigoVerificacion,
            comprador: data.comprador,
            producto: data.resumenInsumos.join(", "),
            total: data.inversionTotal,
            // Importante: Pasamos las métricas calculadas por Java
            metricas: {
                residuos: data.residuosEvitados,
                co2: data.co2Ahorrado,
                agua: data.aguaPreservada,
                ahorro: data.ahorroEconomico
            }
        };

        setTransaccion(datosMapeados);
      } catch (error) {
        console.error("Error recuperando certificado para PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatosCertificado();
  }, [id, transaccion]);

  // Configuración de impresión
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Certificado_EcoSwap_${id}`,
  });

  // Renderizado de Carga
  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <div className="spinner-border text-success" role="status"></div>
                <p className="mt-2">Preparando documento...</p>
            </div>
        </div>
    );
  }

  // Renderizado de Error
  if (!transaccion) {
    return (
        <div className="container text-center py-5">
            <h3>No se pudo cargar la información del certificado.</h3>
            <button className="btn btn-warning mt-3" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          {/* Área Imprimible: Referenciada por componentRef */}
          <div ref={componentRef}>
            <CertificadoDocumento transaccion={transaccion} />
          </div>

          {/* Controles (No salen en la impresión) */}
          <div className="d-flex justify-content-center mt-5 no-print gap-3">
             <button 
                className="btn btn-secondary" 
                onClick={() => navigate(-1)}
             >
                Volver
             </button>
            <button 
                style={styleButtonPrint} 
                className="btn btn-light fw-bold colorVerdeOscuro border border-success" 
                onClick={handlePrint}
            >
              🖨️ Imprimir / Guardar como PDF
            </button>
          </div>

          {/* Estilos específicos para ocultar botones al imprimir */}
          <style>
            {`
          @media print {
            .no-print { display: none !important; }
            body { background-color: white; }
            /* Ajustes para asegurar que se impriman los colores de fondo */
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
        `}
          </style>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default PaginaDescarga;