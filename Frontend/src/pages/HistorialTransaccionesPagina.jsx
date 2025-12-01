import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTransacciones } from '../context/TransaccionesContext';
import { useUsuario } from '../context/UsuarioContext';

function HistorialTransaccionesPagina() {
  const { historial, obtenerHistorial, loading } = useTransacciones();
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === 'ADMIN';

  useEffect(() => {
    obtenerHistorial();
  }, [obtenerHistorial]);

  const handleVerDetalle = (ordenId) => {
    navigate(`/chat-empresa/${ordenId}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      
      <div className="container my-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-black fw-bold">
                {esAdmin ? 'Historial de Ventas Global' : 'Mis Compras y Certificados'}
            </h2>
            <button className="btn btn-outline-secondary btn-sm" onClick={obtenerHistorial}>
                <i className="bi bi-arrow-clockwise me-1"></i> Actualizar
            </button>
        </div>

        {loading ? (
            <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>
        ) : (
            <div className="table-responsive shadow rounded bg-white p-0">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-success text-uppercase small">
                        <tr>
                            <th># Orden</th>
                            <th>Fecha</th>
                            {esAdmin && <th>Cliente</th>}
                            <th>Código</th>
                            <th>Estado</th>
                            <th className="text-end">Total</th>
                            <th className="text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.length > 0 ? (
                            historial.map((orden) => (
                                <tr key={orden.id} style={{cursor: 'pointer'}} onClick={() => handleVerDetalle(orden.id)}>
                                    <td className="fw-bold text-secondary">#{orden.id}</td>
                                    <td>
                                        {new Date(orden.fechaCompra).toLocaleDateString()}
                                        <br/>
                                        <small className="text-muted" style={{fontSize: '0.7rem'}}>
                                            {new Date(orden.fechaCompra).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                        </small>
                                    </td>
                                    
                                    {esAdmin && (
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-light border d-flex justify-content-center align-items-center me-2" style={{width:'30px', height:'30px'}}>
                                                    <i className="bi bi-building text-secondary" style={{fontSize:'0.8rem'}}></i>
                                                </div>
                                                <div>
                                                    <span className="d-block fw-bold" style={{fontSize: '0.9rem'}}>
                                                        {orden.usuario?.nombreEmpresa || orden.usuario?.nombre || orden.usuario?.email || "Cliente"}
                                                    </span>
                                                    <small className="text-muted" style={{fontSize: '0.7rem'}}>
                                                        {orden.usuario?.email}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                    )}

                                    <td><span className="badge bg-light text-dark border font-monospace">{orden.codigoConfirmacion}</span></td>
                                    
                                    <td>
                                        {orden.estado === 'PENDIENTE' && <span className="badge bg-warning text-dark">Pendiente</span>}
                                        {orden.estado === 'PAGADO' && <span className="badge bg-info text-dark">Pagado</span>}
                                        {orden.estado === 'PREPARANDO' && <span className="badge bg-primary">Preparando</span>}
                                        {orden.estado === 'EN_CAMINO' && <span className="badge bg-success">En camino</span>}
                                        {orden.estado === 'ENTREGADO' && <span className="badge bg-success">Entregado</span>}
                                        {orden.estado === 'CANCELADO' && <span className="badge bg-primary">Cancelado</span>}
                                    </td>
                                    
                                    <td className="text-end fw-bold text-success">
                                        S/ {orden.montoTotal.toFixed(2)}
                                    </td>
                                    
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-sm btn-light border" 
                                            onClick={(e) => { e.stopPropagation(); handleVerDetalle(orden.id); }}
                                            title="Ver detalles"
                                        >
                                            <i className="bi bi-eye-fill text-success"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={esAdmin ? 7 : 6} className="text-center py-5 text-muted">
                                    <i className="bi bi-inbox mb-2" style={{fontSize: '2rem'}}></i>
                                    <p className="m-0">No se encontraron registros.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default HistorialTransaccionesPagina;