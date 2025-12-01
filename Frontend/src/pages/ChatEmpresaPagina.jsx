import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatComponente from '../components/ChatComponente'; 
import TransaccionPago from '../components/TransaccionPago.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useUsuario } from '../context/UsuarioContext.jsx';
import api from "../services/api";

function PaginaChatEmpresa() {
  const { ordenId } = useParams();
  const { usuario } = useUsuario();
  const [estadoOrden, setEstadoOrden] = useState(null);

  useEffect(()=> {
    const obtenerEstadoOrden = async () => {
      if (!usuario || !ordenId) return;

      try {
        const endpoint = usuario.rol === 'ADMIN' ? '/ordenes' : `/ordenes/mis-ordenes/${usuario.id}`;
        const response = await api.get(endpoint);

        const ordenEncontrada = response.data.find(o => o.id === parseInt(ordenId));

        if (ordenEncontrada) { 
          setEstadoOrden(ordenEncontrada.estado);
        }
      } catch (error) {
        console.error("Error obteniendo estado de la orden para el chat: ", error)
      }
    };
    obtenerEstadoOrden();
  }, [ordenId, usuario])

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-start mb-4 mb-md-0">
            <TransaccionPago ordenId={ordenId} />
          </div>
          
          <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-start">
            <ChatComponente ordenId={ordenId} estadoOrden={estadoOrden} />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PaginaChatEmpresa;