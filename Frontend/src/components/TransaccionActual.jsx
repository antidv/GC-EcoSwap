import React from 'react';
import { useNavigate } from 'react-router-dom';

// Recibe 'datos' del chat seleccionado
function TransaccionActual({ datos }) {
  const navigate = useNavigate();
  // Si no hay datos (ningún chat seleccionado), mostramos mensaje
  if (!datos) {
    return (
      <div className="card">
        <div className="card-body text-center text-muted py-5">
          <h5>No hay chat seleccionado</h5>
          <p>Elige una empresa del menú ($) arriba.</p>
        </div>
      </div>
    );
  }

  const styleCard = {
    backgroundColor: "white",
    color: "#333",
    borderRadius: "8px",
    padding: "1.5rem",
    width: "22rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const styleLista = {
    listStyleType: "none",
    paddingLeft: "0",
    margin: "5px 0",
    fontSize: "1rem",
    color: "#555",
  };

  const styleEstado = {
    backgroundColor: "#e9ecef",
    color: "#495057",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    padding: "10px 20px",
    width: "100%",
    marginTop: "1rem",
    textAlign: "center",
    cursor: "default"
  };

  const styleBotonSimular = {
    backgroundColor: "#ffc107",
    color: "#212529",
    fontWeight: "bold",
    fontSize: "0.9rem",
    border: "1px solid #ffc107",
    borderRadius: "8px",
    padding: "8px 15px",
    width: "100%",
    marginTop: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px"
  };

  // Función para simular el éxito
  const handleSimularPago = () => {
    navigate(`/pago-exitoso/${datos.id || 'admin-simulado'}`, { 
      state: { datosTransaccion: datos } 
    });
  };

  return (
    <div className="card" style={styleCard}>
      <div className="card-body">
        <h5 className="card-title fw-bold text-center mb-3">
          Transacción actual
        </h5>
        
        <p className="card-text m-0 mt-3">
          <b>Comprador:</b> {datos.comprador}
        </p>
        
        <div className="card-text m-0 mt-2">
          <b>Productos:</b>
          {datos.productos && (
            <ul style={styleLista}>
              {datos.productos.map((p, i) => (
                <li key={i}>- {p.cantidad}x {p.nombre}</li>
              ))}
            </ul>
          )}
        </div>
        
        <p className="card-text m-0 mt-3">
          <b>Dirección:</b> {datos.direccion}
        </p>
        
        <p className="card-text fw-bold mt-3">
          Total a cobrar: S/ {parseFloat(datos.total).toFixed(2)}
        </p>
        
        <p className="card-text m-0" style={{ fontSize: "0.9rem" }}>
          <b>CCI:</b> {datos.cci}
        </p>

        <div style={styleEstado}>
          <i className="bi bi-hourglass-split me-2"></i>
          Esperando pago...
        </div>

        <button style={styleBotonSimular} onClick={handleSimularPago}>
          <i className="bi bi-check-circle-fill"></i> Simular pago exitoso
        </button>
      </div>
    </div>
  );
}

export default TransaccionActual;