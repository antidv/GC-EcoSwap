import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EstadoEnvio from "../components/EstadoEnvio";
import api from "../services/api";
import { useUsuario } from "../context/UsuarioContext";
import ImagenRecolectado from "../assets/recolectado.png";
import ImagenTransportado from "../assets/transportado.png";
import ImagenEntregado from "../assets/entregado.png";

const PASOS = [
  { id: 1, nombre: "En Preparación", descripcion: "Tu pedido está siendo empacado.", imagen: ImagenRecolectado },
  { id: 2, nombre: "En Tránsito", descripcion: "El conductor está en camino.", imagen: ImagenTransportado },
  { id: 3, nombre: "Entregado", descripcion: "Pedido recibido con éxito.", imagen: ImagenEntregado }
];

function SeguimientoRecicladoraPagina() {
  const { id } = useParams();
  const { usuario } = useUsuario();
  
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [indiceActivo, setIndiceActivo] = useState(0);

  useEffect(() => {
    const cargarOrden = async () => {
      try {
        const response = await api.get(`/ordenes/mis-ordenes/${usuario.id}`);
        const ordenEncontrada = response.data.find(o => o.id === parseInt(id));
        
        if (ordenEncontrada) {
          setOrden(ordenEncontrada);
          calcularProgreso(ordenEncontrada.estado);
        }
      } catch (error) {
        console.error("Error cargando seguimiento:", error);
      } finally {
        setLoading(false);
      }
    };

    if (usuario && id) {
        cargarOrden();
    }
  }, [id, usuario]);

  const calcularProgreso = (estado) => {
    switch (estado) {
      case 'PENDIENTE': 
      case 'PAGADO':
      case 'PREPARADO':
        setIndiceActivo(0);
        break;
      case 'EN_CAMINO':
        setIndiceActivo(1);
        break;
      case 'ENTREGADO':
      case 'COMPLETADO':
      case 'VENDIDO':
        setIndiceActivo(2);
        break;
      default:
        setIndiceActivo(0);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando seguimiento...</div>;
  if (!orden) return <div className="text-center mt-5">No se encontró la orden.</div>;

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />

      <div className="container my-5 flex-grow-1">
        
        <div className="text-center mb-5">
            <h2 className="text-black fw-bold">Seguimiento de envío</h2>
            <div className="mt-2">
                <span className="text-muted fs-5 me-3">Orden #{orden.id}</span>
                <span className={`badge ${orden.estado === 'ENTREGADO' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {orden.estado}
                </span>
            </div>
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

        <div className="d-flex justify-content-center mt-4">
          {indiceActivo === 2 ? (
            <div className="text-center animate__animated animate__fadeIn">
                <div className="alert alert-success d-inline-block mb-3 shadow-sm">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    ¡Tu pedido ha sido entregado!
                </div>
                <br />
                <Link 
                    to={`/certificado/${orden.id}`}
                    className="btn btn-success btn-lg fw-bold shadow"
                    style={{backgroundColor: '#198754', minWidth: '250px'}}
                >
                    <i className="bi bi-award me-2"></i> Ver Certificado
                </Link>
            </div>
          ) : (
            <div className="alert alert-light border d-inline-block text-muted shadow-sm">
                <div className="spinner-grow spinner-grow-sm text-success me-2" role="status"></div>
                Tu pedido está en proceso. Te avisaremos cuando llegue.
            </div>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default SeguimientoRecicladoraPagina;