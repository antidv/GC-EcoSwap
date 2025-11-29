import React from 'react';
import ImagenCarton from "../assets/carton.jpg"; 

// tipo" como prop para cambiar el color
function Publicacion({ publicacion }) {

  // Define el color del borde basado en el tipo
  const colorBorde = publicacion.tipo === "Privado" ? "#E0B6B6" : "#D4D4A9";

  const styleCard = {
    width: "18rem",
    border: `3px solid ${colorBorde}`,
    position: "relative",
  };

  const styleCardBody = {
    backgroundColor: colorBorde,
    padding: "1rem"
  };

  return (
    <div className="card shadow-sm h-100 colorVerdeOscuro" style={styleCard}>
      {/* Usamos la imagen real del objeto */}
      <img 
        src={publicacion.imagen} 
        className="card-img-top" 
        alt={publicacion.nombre} 
      />
      
      <div style={styleCardBody}>
        <h5 className="card-title fw-bold">{publicacion.nombre}</h5>
        
        <p className="card-text m-0" style={{ fontSize: "0.9rem" }}>
          Cantidad disponible: {publicacion.cantidad}
        </p>
        
        <p className="card-text m-0" style={{ fontSize: "0.9rem" }}>
          Ubicación: {publicacion.ubicacion}
        </p>
        
        <p className="card-text text-end mt-2">
          <b>Precio: {publicacion.precio}</b>
        </p>
      </div>
    </div>
  );
}

export default Publicacion;