import React from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useTransacciones } from "../context/TransaccionesContext.jsx";
import { MOCK_TRANSACCIONES } from "../data/mockTransacciones.js";
import Header from "../components/Header.jsx";

function PaginaCertificado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { transacciones } = useTransacciones();

  let transaccion = location.state?.datosTransaccion;

  if (!transaccion) {
    transaccion = transacciones.find((t) => t.id === id);
  }

  const styleCertificado = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    borderRadius: "15px",
    padding: "2rem",
    maxWidth: "600px",
    margin: "3rem auto 0 auto",
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
    marginButton: '20px'
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
  };

  if (!transaccion) {
    return (
      <div className="container text-center" style={{ padding: "2rem" }}>
        <h2 className="text-white">Transacción no encontrada</h2>
        <button style={styleBotonVolver} onClick={() => navigate(-1)}>
          &larr; Volver
        </button>
      </div>
    );
  }

  const qrData = `Transacción: ${transaccion.id}, Comprador: ${transaccion.comprador}, Total: S/${transaccion.total}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    qrData
  )}`;

  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="container">
        <Link to="/" style={styleBotonVolver}>&larr; Volver al Inicio</Link>

        {/* Certificado */}
        <div style={styleCertificado}>
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
                style={{ border: "4px solid #D4D4A9", borderRadius: "8px" }}
              />
            </div>
          </div>

          {/* Botón de Descarga */}
          <div className="mt-4">
            <button
              style={styleBotonDescarga}
              onClick={() => alert("Función de descarga no implementada.")}
            >
              Descargar certificado verde
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginaCertificado;
