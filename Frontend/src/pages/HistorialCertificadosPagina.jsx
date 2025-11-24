import React from "react";
import { Link } from "react-router-dom";
import TablaCertificados from "../components/TablaCertificados.jsx";
// import { MOCK_TRANSACCIONES } from "../data/mockTransacciones.js";
import Header from "../components/Header.jsx"
import { useTransacciones } from "../context/TransaccionesContext.jsx";

function HistorialCertificadosPagina() {
  const { transacciones } = useTransacciones();
  
  const styleBotonVolver = {
    backgroundColor: '#ffc107',
    color: '#333',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 20px',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '20px'
  };
  
  return (
    <>
      {/* Header */}
      <Header />

      <div className="container" style={{ padding: "2rem" }}>
        <div className="row mb-3">
          <div className="col">
            <Link to="/" style={styleBotonVolver}>&larr; Volver al Inicio</Link>
            <h2 className="text-white">Historial de transacciones</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TablaCertificados transacciones={transacciones} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistorialCertificadosPagina;
