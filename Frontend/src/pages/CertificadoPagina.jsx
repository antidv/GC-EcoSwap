import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api.js"; // Asegúrate de que esta ruta sea correcta para tu axios
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function PaginaCertificado() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. Estados para manejar la carga de datos real
  const [transaccion, setTransaccion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect para pedir los datos a Spring Boot al entrar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        // Llamada a tu endpoint Java: CertificadoController
        const response = await api.get(`/certificados/${id}`);
        const data = response.data;

        // 3. Mapeo: Convertimos lo que manda Java a lo que espera tu Diseño
        const datosAdaptados = {
          id: data.idTransaccion,
          codigo: data.codigoVerificacion,
          comprador: data.comprador,
          direccion: "Dirección registrada", // Tu endpoint actual no manda dirección, ponemos un texto por defecto
          producto: data.resumenInsumos.join(", "), // Java manda lista, lo convertimos a texto
          total: data.inversionTotal,
          
          // Guardamos las métricas exactas que calculó el Backend
          metricas: {
             residuos: data.residuosEvitados,
             co2: data.co2Ahorrado,
             agua: data.aguaPreservada,
             ahorro: data.ahorroEconomico
          }
        };

        setTransaccion(datosAdaptados);
      } catch (err) {
        console.error("Error cargando certificado:", err);
        setError("No se pudo encontrar el certificado.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  // Estilos Originales (Intactos)
  const styleCertificado = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    borderRadius: "15px",
    padding: "2rem",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const styleBotonVolver = {
    backgroundColor: "#ffc107",
    color: "#333",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    padding: "8px 20px",
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '20px',
    cursor: 'pointer'
  };

  const styleBotonDescarga = {
    backgroundColor: "#D4D4A9",
    color: "#073801",
    fontWeight: "bold",
    border: "2px solid #073801",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    width: "100%",
    marginTop: "1rem",
    fontSize: "1.1rem",
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center'
  };

  // Renderizado de carga para evitar pantalla blanca
  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container my-5 text-center flex-grow-1">
           <div className="spinner-border text-success" role="status">
             <span className="visually-hidden">Cargando...</span>
           </div>
           <p className="mt-2">Generando certificado...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Renderizado de Error
  if (error || !transaccion) {
    return (
      <div className="container text-center" style={{ padding: "2rem" }}>
        <h2 className="text-black">{error || "Transacción no encontrada"}</h2>
        <button style={styleBotonVolver} onClick={() => navigate(-1)}>
          &larr; Volver
        </button>
      </div>
    );
  }

  // Datos para el QR
  const qrData = `Transacción: ${transaccion.id}, Comprador: ${transaccion.comprador}, Total: S/${transaccion.total}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        
        <div className="container my-5 flex-grow-1">
          {/* Certificado - Diseño Visual Original */}
          <div className="colorVerdeOscuro" style={styleCertificado}>
            <div className="text-center">
              <h4 className="fw-bold">Transacción N° {transaccion.id}</h4>
              <p>Código de verificación: {transaccion.codigo}</p>
            </div>

            <div className="row mt-4 align-items-center">
              {/* Columna de Texto */}
              <div className="col-7">
                <p className="mb-2">
                  <strong>Comprador:</strong>
                  <br />
                  {transaccion.comprador}
                </p>
                <p className="mb-2">
                  <strong>Producto:</strong>
                  <br />
                  {transaccion.producto}
                </p>
                <p className="mb-2">
                  <strong>Dirección:</strong>
                  <br />
                  {transaccion.direccion}
                </p>
              </div>

              {/* Columna de QR */}
              <div className="col-5 text-center">
                <img
                  src={qrUrl}
                  alt="Código QR de la transacción"
                  style={{ border: "4px solid #D4D4A9", borderRadius: "8px", maxWidth: "100%" }}
                />
              </div>
            </div>

            {/* Botón de Descarga */}
            <div className="mt-4">
              {/* Pasamos los datos ya cargados al siguiente componente via state para no volver a cargar */}
              <Link 
                to={`/descargar-certificado/${transaccion.id}`}
                state={{ datosTransaccion: transaccion }} 
                style={styleBotonDescarga}
              >
                Ver certificado completo (PDF)
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default PaginaCertificado;