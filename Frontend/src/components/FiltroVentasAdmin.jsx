import React from 'react';

function FiltrosVentasAdmin({ 
    busqueda, 
    setBusqueda, 
    filtroEstado, 
    setFiltroEstado, 
    ordenFecha, 
    toggleOrdenFecha 
}) {
  return (
    <div className="card shadow-sm mb-4 border-0">
        <div className="card-body">
            <div className="row g-3">
                
                {/* 1. Buscador */}
                <div className="col-12 col-md-6">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input 
                            type="text" 
                            className="form-control border-start-0" 
                            placeholder="Buscar empresa o # orden..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <select 
                        className="form-select" 
                        value={filtroEstado} 
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="TODOS">Todos los estados</option>
                        <option value="PENDIENTE">🟡 Pendiente</option>
                        <option value="PAGADO">🔵 Pagado</option>
                        <option value="PREPARANDO">📦 Preparando</option>
                        <option value="EN_CAMINO">🚚 En Camino</option>
                        <option value="ENTREGADO">✅ Entregado</option>
                        <option value="CANCELADO">🔴 Cancelado</option>
                    </select>
                </div>

                {/* 3. Ordenar por Fecha */}
                <div className="col-6 col-md-3">
                    <button 
                        className={`btn w-100 d-flex justify-content-between align-items-center ${ordenFecha === 'DESC' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                        onClick={toggleOrdenFecha}
                    >
                        <span>
                            <i className="bi bi-calendar-event me-2"></i>
                            {ordenFecha === 'DESC' ? 'Más recientes' : 'Más antiguas'}
                        </span>
                        <i className={`bi ${ordenFecha === 'DESC' ? 'bi-sort-numeric-down' : 'bi-sort-numeric-up-alt'}`}></i>
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
}

export default FiltrosVentasAdmin;