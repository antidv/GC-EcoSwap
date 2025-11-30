import React, { useState, useEffect } from 'react';
import api from '../services/api';

function BarraBusqueda({ 
  terminoBusqueda, 
  onTerminoBusquedaChange, 
  filtroActivo, 
  onFiltroActivoChange, 
  onSearchSubmit 
}) {
  const [listaCategorias, setListaCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await api.get('/insumos/categorias');
        setListaCategorias(response.data);
      } catch (error) {
        console.error("Error cargando categorías del filtro:", error);
      }
    };
    cargarCategorias();
  }, []);

  const handleInputChange = (e) => {
    onTerminoBusquedaChange(e.target.value);
  };

  const handleFiltroClick = (e, filtro) => {
    e.preventDefault();
    onFiltroActivoChange(filtro);
  };

  return (
    <div className="d-flex justify-content-center">
      
      <form className="input-group" onSubmit={onSearchSubmit} style={{ maxWidth: "30rem" }}>
        <input 
          type="text" 
          className="form-control border-2 colorVerdeOscuro" 
          placeholder="Buscar insumos, materiales, etc..." 
          aria-label="Barra de búsqueda"
          value={terminoBusqueda}
          onChange={handleInputChange}
        />
      </form>

      <div className="dropdown ms-2">
        <button 
          className="btn btn-light dropdown-toggle border-2 colorVerdeOscuro" 
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          Filtro: {filtroActivo}
        </button>
        
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button className="dropdown-item" onClick={(e) => handleFiltroClick(e, "Todos")}>
              Todos
            </button>
          </li>
          
          <li><hr className="dropdown-divider" /></li>

          {listaCategorias.length > 0 ? (
            listaCategorias.map((cat) => (
              <li key={cat}>
                <button 
                  className="dropdown-item" 
                  onClick={(e) => handleFiltroClick(e, cat)}
                >
                  {cat}
                </button>
              </li>
            ))
          ) : (
            <li><span className="dropdown-item text-muted">Cargando...</span></li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BarraBusqueda;