import React, { useState } from 'react';
import Publicacion from '../components/PublicacionInventario.jsx';

const ColorDot = ({ color }) => (
  <span style={{
    height: '10px',
    width: '10px',
    backgroundColor: color,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px'
  }}></span>
);

function Inventario() {
  const [filtro, setFiltro] = useState("Todos");

  const handleNuevaPublicacion = () => {
    console.log("Crear nueva publicación...");
  };

  const handleSetFiltro = (e, tipo) => {
    e.preventDefault();
    setFiltro(tipo);
    console.log("Filtrar por:", tipo);
  };

  const mockPublicaciones = [
    { id: 1, tipo: "Privado" },
    { id: 2, tipo: "Publico" }
  ];

  return (
    <div className="container-fluid min-vh-100 stylePantalla">
      <div className="container-fluid">
        
        {/* 1. Título y Subtítulo */}
        <div className="row">
            <h1 className="text-center text-white mt-5">EcoSwap</h1>
            <h4 className="text-center text-white">Compra, vende, recicla</h4>
        </div>

        {/* 2. Fila de Botones y Filtros */}
        <div className="row mb-4">
          <div className="col-12 d-flex">
            
            {/* Botón Nueva Publicación*/}
            <button className="btn btn-light me-3" onClick={handleNuevaPublicacion}>
              <i className="bi bi-plus-lg"></i> + Nueva publicación
            </button>

            {/* Dropdown de Filtro*/}
            <div className="dropdown">
              <button 
                className="btn btn-light dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                
                <i className="bi bi-filter"></i> {filtro}
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" onClick={(e) => handleSetFiltro(e, "Todos")}>Todos</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleSetFiltro(e, "Publico")}>
                  <ColorDot color="#D4D4A9" /> Público
                </a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleSetFiltro(e, "Privado")}>
                  <ColorDot color="#E0B6B6" /> Privado
                </a></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* 3. Área de Publicaciones */}
        <div className="row">
          {mockPublicaciones.map((pub) => (
            <div className="col-12 col-md-4 col-lg-3 mb-4" key={pub.id}>
              <Publicacion tipo={pub.tipo} />
            </div>
          ))}
        </div>

        {/* 4. Mensaje */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <p className='text-white'>No hay más para mostrar...</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Inventario;