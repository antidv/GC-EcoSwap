import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTransacciones } from '../context/TransaccionesContext';
import { useUsuario } from '../context/UsuarioContext';

function HistorialCertificadosPagina() {
  const { historial, obtenerHistorial, loading } = useTransacciones();
  const { usuario } = useUsuario();

  useEffect(() => {
    obtenerHistorial();
  }, [obtenerHistorial]);

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      
      <div className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4 text-black fw-bold">
            {usuario?.rol === 'ADMIN' ? 'Historial de Ventas' : 'Mis Compras y Certificados'}
        </h2>

        {loading ? (
            <div className="text-center mt-5">
                <div className="spinner-border text-success" role="status"></div>
                <p className="mt-2 text-muted">Cargando transacciones...</p>
            </div>
        ) : (
            <div className="table-responsive shadow rounded bg-white p-3">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-success">
                        <tr>
                            <th># Orden</th>
                            <th>Fecha</th>
                            <th>Cód. Confirmación</th>
                            <th>Estado</th>
                            <th className="text-end">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.length > 0 ? (
                            historial.map((orden) => (
                                <tr key={orden.id}>
                                    <td className="fw-bold text-secondary">#{orden.id}</td>
                                    <td>
                                        {new Date(orden.fechaCompra).toLocaleDateString()} 
                                        <small className="text-muted ms-1">
                                            {new Date(orden.fechaCompra).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </small>
                                    </td>
                                    <td>
                                        <span className="badge bg-dark font-monospace">{orden.codigoConfirmacion}</span>
                                    </td>
                                    <td>
                                        {orden.estado === 'PENDIENTE' ? (
                                            <span className="badge bg-warning text-dark">Pendiente</span>
                                        ) : (
                                            <span className="badge bg-success">Completada</span>
                                        )}
                                    </td>
                                    <td className="text-end fw-bold text-success fs-5">
                                        S/ {orden.montoTotal.toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-muted">
                                    <i className="bi bi-receipt mb-2" style={{fontSize: '2rem'}}></i>
                                    <p className="m-0">No se encontraron transacciones registradas.</p>
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

export default HistorialCertificadosPagina;