import React from 'react';
import ImagenDefault from '../assets/logo_ecoswap.png';
import { useInventario } from '../context/InventarioContext';

const PublicacionInventario = ({ publicacion }) => {
  const { cambiarEstadoPublicacion } = useInventario();

  const handleToggle = () => {
    cambiarEstadoPublicacion(publicacion.id);
  };

  const handleImageError = (e) => {
    e.target.src = ImagenDefault;
  };

  const esPublico = publicacion.estado === 'DISPONIBLE';
  const bgHeader = esPublico ? 'bg-success-subtle' : 'bg-danger-subtle';

  const styleCard = {}; // Si tenías estilos inline adicionales, agrégalos aquí

  return (
    <>
      <div className={`card h-100 shadow-sm`}>
        <div
          className={`card-header ${bgHeader} border-bottom-0 d-flex justify-content-between align-items-center py-2`}
        >
          <small
            className="fw-bold text-uppercase"
            style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
          >
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

        <div className="card-body h-100 colorVerdeOscuro" style={styleCard}>
          <img
            src={publicacion.imagenUrl || ImagenDefault}
            className="card-img-top"
            alt={publicacion.nombre}
            onError={handleImageError}
            style={{ height: '180px', objectFit: 'cover' }}
          />

          <h5 className="card-title fw-bold text-truncate mt-2">
            {publicacion.nombre}
          </h5>

          <p className="card-text small text-muted mb-3">
            {publicacion.descripcion || 'Sin descripción'}
          </p>

          <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
            <div>
              <small className="d-block text-muted" style={{ fontSize: '0.7rem' }}>
                STOCK
              </small>
              <span className="fw-bold">{publicacion.cantidadKg} kg</span>
            </div>
            <div className="text-end">
              <small className="d-block text-muted" style={{ fontSize: '0.7rem' }}>
                PRECIO
              </small>
              <span className="fw-bold text-success">S/ {publicacion.precioPorKg}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicacionInventario;