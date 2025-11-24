import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Publicacion from '../components/PublicacionInventario.jsx'; 
import { useInventario } from '../context/InventarioContext.jsx';
import Header from '../components/Header.jsx';

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
  const navigate = useNavigate();
  const { listaPublicaciones } = useInventario();

  const handleNuevaPublicacion = () => {
    navigate('/publicar-insumo');
  };

  const handleSetFiltro = (e, tipo) => {
    e.preventDefault();
    setFiltro(tipo);
  };

  const publicacionesFiltradas = listaPublicaciones.filter((pub) => {
    if (filtro === "Todos") return true;
    return pub.tipo === filtro;
  });

  return (
    <>
      <Header />
      
      <div className="container">
        
        {/* Fila de Botones y Filtros */}
        <div className="row mb-4 mt-5">
          <div className="col-12 d-flex align-items-center">
            
            <button className="btn btn-light me-3" onClick={handleNuevaPublicacion}>
              <i className="bi bi-plus-lg"></i> Nueva publicación
            </button>

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

        {/* Área de Publicaciones */}
        <div className="row px-3">
          {publicacionesFiltradas.length > 0 ? (
            publicacionesFiltradas.map((pub) => (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={pub.id}>
                <Publicacion publicacion={pub} />
              </div>
            ))
          ) : (
             <div className="col-12 text-center mt-5">
                <h4 className='text-white-50'>No hay publicaciones en esta categoría.</h4>
             </div>
          )}
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-12 text-center">
            <p className='text-white'>No hay más para mostrar...</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Inventario;