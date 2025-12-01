import React from 'react';

const getEstadoBadge = (estado) => {
    switch (estado) {
        case 'PENDIENTE':
            return <span className="badge bg-warning text-dark">Pendiente</span>;
        case 'PAGADO':
            return <span className="badge bg-info text-dark">Pagado</span>;
        case 'PREPARANDO':
            return <span className="badge bg-primary">Preparando</span>;
        case 'EN_CAMINO':
            return <span className="badge bg-secondary">En Camino</span>;
        case 'ENTREGADO':
            return <span className="badge bg-success">Entregado</span>;
        case 'CANCELADO':
            return <span className="badge bg-danger">Cancelado</span>;
        default:
            return <span className="badge bg-light text-dark border">{estado}</span>;
    }
};

function TablaVentasAdmin({ ventas, loading, ordenFecha, onVerDetalle }) {
    
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-success" role="status"></div>
                <p className="mt-2 text-muted">Cargando todas las transacciones...</p>
            </div>
        );
    }

    return (
        <div className="table-responsive shadow rounded bg-white p-3">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-success">
                    <tr>
                        <th># Orden</th>
                        <th>Empresa (Cliente)</th>
                        <th>
                            Fecha 
                            {ordenFecha === 'DESC' ? <i className="bi bi-caret-down-fill small ms-1"></i> : <i className="bi bi-caret-up-fill small ms-1"></i>}
                        </th>
                        <th>Estado</th>
                        <th className="text-end">Total</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.length > 0 ? (
                        ventas.map((orden) => (
                            <tr key={orden.id}>
                                <td className="fw-bold text-secondary">#{orden.id}</td>
                                
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle p-2 me-2 d-flex justify-content-center align-items-center" style={{width: '35px', height: '35px'}}>
                                            <i className="bi bi-building text-success"></i>
                                        </div>
                                        <span className="fw-semibold">
                                            {orden.usuario?.nombreEmpresa || "Usuario Desconocido"}
                                        </span>
                                    </div>
                                </td>

                                <td>
                                    {new Date(orden.fechaCompra).toLocaleDateString()} 
                                    <small className="text-muted d-block" style={{fontSize: '0.75rem'}}>
                                        {new Date(orden.fechaCompra).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </small>
                                </td>
                                
                                <td>
                                    {getEstadoBadge(orden.estado)}
                                </td>
                                
                                <td className="text-end fw-bold text-success">
                                    S/ {orden.montoTotal.toFixed(2)}
                                </td>

                                <td className="text-center">
                                    <button 
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => onVerDetalle(orden.id)}
                                        title="Ver Detalle y Gestionar"
                                    >
                                        <i className="bi bi-eye-fill me-1"></i> Ver
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-5 text-muted">
                                <i className="bi bi-filter-circle mb-2" style={{fontSize: '2rem'}}></i>
                                <p className="m-0">No se encontraron ventas con estos filtros.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TablaVentasAdmin;