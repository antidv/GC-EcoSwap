import React from 'react';

function BarraBusqueda({ 
  terminoBusqueda, 
  onTerminoBusquedaChange, 
  filtroActivo, 
  onFiltroActivoChange, 
  onSearchSubmit 
}) {
  const handleInputChange = (e) => {
    onTerminoBusquedaChange(e.target.value);
  };

  const handleFiltroClick = (e, filtro) => {
    e.preventDefault();
    onFiltroActivoChange(filtro);
  };

  return (
    <div className="d-flex justify-content-center">
      
      {/* BARRA DE BÚSQUEDA (Formulario) */}
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

      {/* BOTÓN DE FILTRO (Dropdown) */}
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
          <li><a className="dropdown-item" href="#" onClick={(e) => handleFiltroClick(e, "Todos")}>Todos</a></li>
          <li><a className="dropdown-item" href="#" onClick={(e) => handleFiltroClick(e, "Cartón")}>Cartón</a></li>
          <li><a className="dropdown-item" href="#" onClick={(e) => handleFiltroClick(e, "Papel")}>Papel</a></li>
          <li><a className="dropdown-item" href="#" onClick={(e) => handleFiltroClick(e, "Plástico")}>Plástico</a></li>
        </ul>
      </div>
    </div>
  );
}

export default BarraBusqueda;