import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EstadoEnvio from "../components/EstadoEnvio";
import api from "../services/api";
import ImagenRecolectado from "../assets/recolectado.png";
import ImagenTransportado from "../assets/transportado.png";
import ImagenEntregado from "../assets/entregado.png";

const PASOS = [
  { id: 1, nombre: "En Preparación", descripcion: "Empaquetando insumos...", imagen: ImagenRecolectado },
  { id: 2, nombre: "En Tránsito", descripcion: "El conductor está en camino.", imagen: ImagenTransportado },
  { id: 3, nombre: "Entregado", descripcion: "Pedido entregado al cliente.", imagen: ImagenEntregado }
];

function SeguimientoAdminPagina() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [indiceActivo, setIndiceActivo] = useState(0);

  const cargarOrden = async () => {
    try {
      setLoading(true);
      const response = await api.get('/ordenes'); 
      const ordenEncontrada = response.data.find(o => o.id === parseInt(id));
      
      if (ordenEncontrada) {
        setOrden(ordenEncontrada);
        calcularProgreso(ordenEncontrada.estado);
      } else {
        alert("Orden no encontrada");
        navigate('/inventario');
      }
    } catch (error) {
      console.error("Error cargando orden:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarOrden();
  }, [id]);

  const calcularProgreso = (estado) => {
    switch (estado) {
      case 'PENDIENTE': 
      case 'PAGADO':
      case 'PREPARANDO':  setIndiceActivo(0); break;
      case 'EN_CAMINO':   setIndiceActivo(1); break;
      case 'ENTREGADO':   setIndiceActivo(2); break;
      default: setIndiceActivo(0);
    }
  };

  const avanzarEstado = async () => {
    let siguienteEstado = '';
    
    if (orden.estado === 'PAGADO') siguienteEstado = 'PREPARANDO';
    else if (orden.estado === 'PREPARANDO') siguienteEstado = 'EN_CAMINO';
    else if (orden.estado === 'EN_CAMINO') siguienteEstado = 'ENTREGADO';
    else return; 

    try {
        await api.put(`/ordenes/${id}/estado`, siguienteEstado, {
            headers: { 'Content-Type': 'text/plain' }
        });
        cargarOrden(); 
    } catch (error) {
        console.error(error);
        alert("Error al cambiar estado");
    }
  };

  const revertirProceso = async () => {
    if (!window.confirm("¿Estás seguro? Esto devolverá la orden a estado PENDIENTE y reiniciará todo el flujo.")) {
        return;
    }

    try {
        await api.put(`/ordenes/${id}/estado`, "PENDIENTE", {
            headers: { 'Content-Type': 'text/plain' }
        });
        cargarOrden(); 
    } catch (error) {
        console.error(error);
        alert("Error al revertir estado");
    }
  };

  const handleIrAlChat = () => {
    navigate(`/chat-empresa/${id}`);
  };

  const styleBotonPrincipal = {
    backgroundColor: "#198754", 
    borderColor: "#198754",
    color: "white",
    padding: "15px 40px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    borderRadius: "50px",
    boxShadow: "0 4px 10px rgba(25, 135, 84, 0.4)",
    transition: "all 0.3s ease"
  };

  const styleBotonRevertir = {
    color: "#dc3545",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginTop: "15px"
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>;
  if (!orden) return null;

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />

      <div className="container my-5 flex-grow-1">
        <div className="text-center mb-5">
            <h2 className="text-black fw-bold">Gestión de Envío (Admin)</h2>
            <div className="mt-2">
                <span className="badge bg-dark fs-6 me-2">Orden #{orden.id}</span>
                <span className={`badge ${orden.estado === 'ENTREGADO' ? 'bg-success' : 'bg-info text-dark'}`}>
                    Estado Actual: {orden.estado}
                </span>
            </div>
            <p className="text-muted mt-2 fw-bold mb-2">
                Cliente: {orden.usuario?.nombreEmpresa || orden.usuario?.email}
            </p>
            <button 
                className="btn btn-outline-success btn-sm rounded-pill px-4 fw-bold shadow-sm"
                onClick={handleIrAlChat}
            >
                <i className="bi bi-chat-dots-fill me-2"></i>
                Abrir Chat del Pedido
            </button>
        </div>

        <div className="row justify-content-center mb-5">
          {PASOS.map((paso, index) => (
            <EstadoEnvio
              key={paso.id}
              imagen={paso.imagen}
              nombre={paso.nombre}
              descripcion={paso.descripcion}
              isSelected={index === indiceActivo}
            />
          ))}
        </div>

        <div className="text-center">
            {orden.estado === 'ENTREGADO' ? (
                <div className="d-flex flex-column align-items-center gap-3">
                    <div className="alert alert-success d-inline-block p-4 shadow-sm m-0">
                        <i className="bi bi-check-circle-fill me-2 fs-4"></i> 
                        <strong>Proceso Finalizado Correctamente</strong>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-column align-items-center gap-3">
                    <button 
                        className="btn"
                        style={styleBotonPrincipal}
                        onClick={avanzarEstado}
                        disabled={orden.estado === 'PENDIENTE'} 
                    >
                        {orden.estado === 'PENDIENTE' ? '⏳ Esperando Pago del Cliente...' : 
                        orden.estado === 'PAGADO' ? '✅ Confirmar y Preparar Pedido' :
                        orden.estado === 'PREPARANDO' ? '🚚 Enviar Camión (En Tránsito)' :
                        '🏁 Confirmar Entrega Final'}
                    </button>

                    {orden.estado !== 'PENDIENTE' && orden.estado !== 'PAGADO' && (
                        <button className="btn btn-link" style={styleBotonRevertir} onClick={revertirProceso}>
                            <i className="bi bi-arrow-counterclockwise me-1"></i> Revertir todo a Pendiente
                        </button>
                    )}
                </div>
            )}
        </div>
        
        <div className="text-center mt-5">
            <button className="btn btn-link text-secondary" onClick={() => navigate('/chat-admin')}>
                &larr; Volver a Historial Transacciones
            </button>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default SeguimientoAdminPagina;