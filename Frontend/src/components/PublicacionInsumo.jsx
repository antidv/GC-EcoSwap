import { Link } from 'react-router-dom';

function PublicacionInsumo({ publicacion }) {
  // Colores para los badges de publicaciones
  const coloresPorCategoria = {
    'Papel': 'text-bg-primary',    // Azul
    'Cartón': 'text-bg-warning',   // Amarillo/Naranja
    'Plástico': 'text-bg-info',    // Cian
    'Vidrio': 'text-bg-success',   // Verde
    'Metal': 'text-bg-secondary',  // Gris
    'Orgánico': 'text-bg-danger'  // Rojo
  }

  const styleCard = {
    width: "18rem",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  };

  const styleBadge = {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10,
    fontSize: "14px"
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.03)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <Link 
      to={`/detalle/${publicacion.id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div 
        className="card mt-4 mb-4" 
        style={styleCard}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={`badge ${coloresPorCategoria[publicacion.categoria] || 'text-bg-dark'}`} style={styleBadge}>
          {publicacion.categoria}
        </span>
        <img src={publicacion.imagen} className="card-img-top" alt={publicacion.nombre} />
        <div className="card-body">
          <h5 className="card-title">{publicacion.nombre}</h5>
          <p className="card-text m-0">Cantidad: {publicacion.cantidad}</p>
          <p className="card-text m-0">Ubicación: {publicacion.ubicacion}</p>
          <p className="card-text text-end"><b>Precio: {publicacion.precio}</b></p>
        </div>
      </div>
    </Link>
  );
}

export default PublicacionInsumo;
