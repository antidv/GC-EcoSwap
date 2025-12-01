import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 
import { useUsuario } from "../context/UsuarioContext";
import { useTransacciones } from "../context/TransaccionesContext";

function TransaccionPago({ ordenId }) {
  const { usuario } = useUsuario();
  const { obtenerHistorial } = useTransacciones();
  const navigate = useNavigate();
  
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarOrden = async () => {
        try {
            setLoading(true);
            const endpoint = usuario.rol === 'ADMIN' ? '/ordenes' : `/ordenes/mis-ordenes/${usuario.id}`;
            const response = await api.get(endpoint);
            
            const ordenEncontrada = response.data.find(o => o.id === parseInt(ordenId));
            
            if (ordenEncontrada) {
                setOrden(ordenEncontrada);
            }
        } catch (error) {
            console.error("Error cargando orden:", error);
        } finally {
            setLoading(false);
        }
    };

    if (usuario && ordenId) {
        cargarOrden();
    }
  }, [ordenId, usuario]);


  const handlePagar = async () => {
    try {
        await api.put(`/ordenes/${ordenId}/estado`, "PAGADO", {
            headers: { 'Content-Type': 'text/plain' }
        });

        alert("¡Pago registrado! Redirigiendo al seguimiento...");
        
        navigate(`/seguimiento/${ordenId}`); 

    } catch (error) {
        console.error("Error al pagar:", error);
        alert("Hubo un error al procesar el pago.");
    }
  };

  const handleAprobar = async () => {
    try {
        await api.put(`/ordenes/${ordenId}/estado`, "PREPARANDO", {
            headers: { 'Content-Type': 'text/plain' }
        });

        alert("¡Venta Concretada! Iniciando proceso de envío.");
        
        await obtenerHistorial();
        
        navigate(`/seguimiento-admin/${ordenId}`);

    } catch (error) {
        console.error("Error al aprobar:", error);
        alert("Error al concretar la venta.");
    }
  };

  const handleCancelar = async () => {
    try {
        await api.put(`/ordenes/${ordenId}/estado`, "CANCELADO", {
            headers: { 'Content-Type': 'text/plain' }
        });

        alert("¡Venta Cancelada! El pedido ha sido anulado.");
        
        await obtenerHistorial();
        
        navigate(`/historial-ventas`);

    } catch (error) {
        console.error("Error al cancelar:", error);
        alert("Error al cancelar la venta.");
    }
  }

  const styleCard = {
    backgroundColor: "white",
    color: "#333",
    borderRadius: "8px",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "22rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderTop: "5px solid #198754"
  };

  const styleBotonVerde = {
    backgroundColor: "#D4D4A9", color: "#073801", fontWeight: "bold", fontSize: "1.1rem",
    border: "2px solid #333", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", width: "100%", marginTop: "1rem"
  };

  const styleBotonAzul = {
    backgroundColor: "#0d6efd", color: "white", fontWeight: "bold", fontSize: "1.1rem",
    border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", width: "100%", marginTop: "1rem"
  };

  if (loading) return <div className="text-black">Cargando datos...</div>;
  if (!orden) return <div className="text-black">Orden no encontrada o acceso denegado.</div>;

  return (
    <div className="card" style={styleCard}>
      <h5 className="card-title fw-bold text-center mb-3">
        Transacción #{orden.id}
      </h5>
      
      <div className="mb-3 text-center">
        <span className={`badge ${orden.estado === 'PENDIENTE' ? 'bg-warning text-dark' : orden.estado === 'PAGADO' ? 'bg-info text-dark' : 'bg-success'}`}>
            {orden.estado}
        </span>
      </div>

      <p className="card-text m-0 mb-1">
        <b>Comprador:</b> {orden.usuario?.nombreEmpresa || orden.usuario?.nombre || orden.usuario?.email || "Cliente"}
      </p>
      
      <div className="card-text m-0 mb-2">
        <b>Productos:</b>
        <ul className="ps-3 m-0" style={{fontSize: '0.9rem', color: '#555'}}>
            {orden.detalles ? (
                orden.detalles.map(d => (
                    <li key={d.id}>{d.cantidadComprada} kg - {d.insumo?.nombre}</li>
                ))
            ) : (
                <li>Ver detalles en historial</li>
            )}
        </ul>
      </div>

      <p className="card-text m-0 mt-3">
        <b>Dirección:</b> {orden.direccionEntrega}
      </p>
      
      <h4 className="text-center text-success fw-bold mt-4 mb-3">
        S/ {orden.montoTotal.toFixed(2)}
      </h4>
      
      <div className="alert alert-light border small text-center">
        <b>CCI:</b> {orden.cciPago || "1284-2334-5873-48"}
      </div>

      {usuario.rol === 'RECICLADORA' && (
          <>
            {orden.estado === 'PENDIENTE' && (
                <button style={styleBotonVerde} onClick={handlePagar}>
                    Realizar pago
                </button>
            )}
            
            {(orden.estado === 'PAGADO' || orden.estado === 'PREPARANDO' || orden.estado === 'EN_CAMINO' || orden.estado === 'ENTREGADO') && (
                <div className="d-grid gap-2 mt-3">
                    <div className="alert alert-info text-center small mb-2 py-1">
                        <i className="bi bi-info-circle me-1"></i> Pago registrado
                    </div>
                    <button 
                        className="btn btn-outline-success fw-bold"
                        onClick={() => navigate(`/seguimiento/${ordenId}`)}
                    >
                        <i className="bi bi-truck me-2"></i> Ver Seguimiento
                    </button>
                </div>
            )}

            {orden.estado === 'ENTREGADO' && (
                        <button 
                            className="btn btn-success fw-bold text-white mt-2"
                            onClick={() => navigate(`/certificado/${ordenId}`)}
                        >
                            <i className="bi bi-file-earmark-text me-2"></i> Ver Certificado
                        </button>
            )}

            {orden.estado === 'CANCELADO' && (
                <div className="alert alert-success mt-3 text-center small fw-bold">
                    Pedido Cancelado
                </div>
            )}
          </>
      )}

      {usuario.rol === 'ADMIN' && (
          <>
            {orden.estado === 'PENDIENTE' && (
                <div className="alert alert-warning mt-3 text-center small">
                    Esperando pago del cliente...
                </div>
            )}
            
            {orden.estado === 'PAGADO' && (
                <button style={styleBotonAzul} onClick={handleAprobar}>
                    Concretar Venta (Aprobar)
                </button>
            )}

            {(orden.estado === 'PREPARANDO' || orden.estado === 'EN_CAMINO') && (
                 <button 
                    className="btn btn-outline-primary w-100 mt-3"
                    onClick={() => navigate(`/seguimiento-admin/${ordenId}`)}
                >
                    Gestionar Envío
                </button>
            )}

            {orden.estado === 'ENTREGADO' && (
                <div className="alert alert-success mt-3 text-center small">
                    Venta Finalizada
                </div>
            )}
            {orden.estado === 'CANCELADO' && (
                <div className="alert alert-success mt-3 text-center small">
                    Venta Cancelada
                </div>
            )}

            {orden.estado !== 'CANCELADO' && orden.estado !== 'ENTREGADO' && (
                <div className='mt-3 text-center'>
                    <button 
                        onClick={handleCancelar} 
                        className="btn btn-outline-danger fw-bold"
                    >
                        Cancelar orden
                    </button>
                </div>
            )}
          </>
      )}

    </div>
  );
}

export default TransaccionPago;