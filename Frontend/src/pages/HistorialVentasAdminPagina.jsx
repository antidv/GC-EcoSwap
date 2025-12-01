import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTransacciones } from '../context/TransaccionesContext';
import FiltrosVentasAdmin from '../components/FiltroVentasAdmin';
import TablaVentasAdmin from '../components/TablaVentasAdmin';

function HistorialVentasAdminPagina() {
  const { historial, obtenerHistorial, loading } = useTransacciones();
  const navigate = useNavigate();
  
  // --- ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [ordenFecha, setOrdenFecha] = useState("DESC");

  useEffect(() => {
    obtenerHistorial();
  }, [obtenerHistorial]);

  const transaccionesProcesadas = historial
    .filter((orden) => {
        const termino = busqueda.toLowerCase();
        const nombreEmpresa = orden.usuario?.nombreEmpresa ? orden.usuario.nombreEmpresa.toLowerCase() : "";
        const idOrden = orden.id.toString();
        const coincideTexto = nombreEmpresa.includes(termino) || idOrden.includes(termino);

        const coincideEstado = filtroEstado === "TODOS" || orden.estado === filtroEstado;

        return coincideTexto && coincideEstado;
    })
    .sort((a, b) => {
        const fechaA = new Date(a.fechaCompra);
        const fechaB = new Date(b.fechaCompra);
        return ordenFecha === "ASC" ? fechaA - fechaB : fechaB - fechaA;
    });

  const toggleOrdenFecha = () => {
    setOrdenFecha(prev => prev === "DESC" ? "ASC" : "DESC");
  };

  const handleVerDetalle = (id) => {
      navigate(`/seguimiento-admin/${id}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      
      <div className="container my-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-black fw-bold mb-0">Historial de transacciones</h2>
            <span className="badge bg-secondary fs-6">
                Total: {transaccionesProcesadas.length} órdenes
            </span>
        </div>

        <FiltrosVentasAdmin 
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            ordenFecha={ordenFecha}
            toggleOrdenFecha={toggleOrdenFecha}
        />

        <TablaVentasAdmin 
            ventas={transaccionesProcesadas}
            loading={loading}
            ordenFecha={ordenFecha}
            onVerDetalle={handleVerDetalle}
        />
        
      </div>

      <Footer />
    </div>
  );
}

export default HistorialVentasAdminPagina;