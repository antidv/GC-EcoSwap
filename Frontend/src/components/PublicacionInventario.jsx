import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImagenDefault from '../assets/logo_ecoswap.png';
import { useInventario } from '../context/InventarioContext';

const PublicacionInventario = ({ publicacion }) => {
  const { cambiarEstadoPublicacion } = useInventario();
  const navigate = useNavigate(); // Hook para navegar

  const handleToggle = () => {
    cambiarEstadoPublicacion(publicacion.id);
  };

  const handleImageError = (e) => {
    e.target.src = ImagenDefault;
  };

  const handleEditar = () => {
    navigate(`/editar-insumo/${publicacion.id}`);
  };

  const esPublico = publicacion.estado === 'DISPONIBLE';
  const colorBorde = esPublico ? 'border-success' : 'border-danger';
  const bgHeader = esPublico ? 'bg-success-subtle' : 'bg-danger-subtle';

  // Estilos para el overlay
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    borderRadius: '0 0 5px 5px',
    zIndex: 10
  };

  return (
    <div className={`card h-100 shadow-sm ${colorBorde}`}>
      <div
        className={`card-header ${bgHeader} border-bottom-0 d-flex justify-content-between align-items-center py-2`}
      >
        <small className="fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
          {esPublico ? '🟢 Público' : '🔴 Privado'}
        </small>

          <div className="form-check form-switch m-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={esPublico}
              onChange={handleToggle}
              style={{ cursor: 'pointer' }}
              title="Cambiar visibilidad"
            />
          </div>
        </div>

      {/* Body con Overlay */}
      <div 
        className="card-body h-100 colorVerdeOscuro position-relative p-0" 
        style={{ overflow: 'hidden' }}
        onMouseEnter={(e) => e.currentTarget.querySelector('.overlay-edit').style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.querySelector('.overlay-edit').style.opacity = '0'}
      >
        
        <div className="overlay-edit" style={overlayStyle}>
            <button 
                className="btn btn-outline-light fw-bold" 
                onClick={handleEditar}
            >
                <i className="bi bi-pencil-square me-2"></i> Editar
            </button>
        </div>

        <div className="p-3">
            <img
            src={publicacion.imagenUrl || ImagenDefault}
            className="card-img-top mb-2"
            alt={publicacion.nombre}
            onError={handleImageError}
            style={{ height: '180px', objectFit: 'cover', borderRadius: '4px' }}
            />

            <h5 className="card-title fw-bold text-truncate mt-2">
            {publicacion.nombre}
            </h5>

            <p className="card-text small text-muted mb-3">
            {publicacion.descripcion || 'Sin descripción'}
            </p>

            <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
            <div>
                <small className="d-block text-muted" style={{ fontSize: '0.7rem' }}>STOCK</small>
                <span className="fw-bold">{publicacion.cantidadKg} kg</span>
            </div>
            <div className="text-end">
                <small className="d-block text-muted" style={{ fontSize: '0.7rem' }}>PRECIO</small>
                <span className="fw-bold text-success">S/ {publicacion.precioPorKg}</span>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PublicacionInventario;