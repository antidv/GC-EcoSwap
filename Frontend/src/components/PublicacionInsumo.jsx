import { Link } from 'react-router-dom';
import ImagenDefault from '../assets/logo_ecoswap.png';

function PublicacionInsumo({ publicacion }) {
  const coloresPorCategoria = {
    'Papel': 'text-bg-primary',    
    'Cartón': 'text-bg-warning',   
    'Plástico': 'text-bg-info',    
    'Vidrio': 'text-bg-success',   
    'Metal': 'text-bg-secondary',  
    'Orgánico': 'text-bg-danger'  
  }

  const styleCard = {
    width: "18rem",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  };

  const styleBadge = {
    position: "absolute", top: "10px", right: "10px", zIndex: 10, fontSize: "14px"
  };

  const handleImageError = (e) => { e.target.src = ImagenDefault; };

  return (
    <Link 
      to={`/detalle/${publicacion.id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div 
        className="card mt-4 mb-4 border-2 colorVerdeOscuro h-100 shadow-sm" 
        style={styleCard}
      >
        <span className={`badge ${coloresPorCategoria[publicacion.categoria] || 'text-bg-dark'}`} style={styleBadge}>
          {publicacion.categoria}
        </span>
        
        <img 
            src={publicacion.imagenUrl || ImagenDefault} 
            className="card-img-top" 
            alt={publicacion.nombre}
            onError={handleImageError}
            style={{ height: '200px', objectFit: 'cover' }}
        />
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-truncate">{publicacion.nombre}</h5>
          
          <div className="mt-auto">
            <p className="card-text m-0 text-muted small">Stock disponible:</p>
            <p className="card-text fw-bold">{publicacion.cantidadKg} kg</p>
            
            <h5 className="text-end text-success mt-2">
                S/ {publicacion.precioPorKg} <span className="small text-muted">/kg</span>
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PublicacionInsumo;