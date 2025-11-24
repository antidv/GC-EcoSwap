import React from 'react';
import ImagenCarton from "../assets/carton.jpg"; 

// tipo" como prop para cambiar el color
function Publicacion({ tipo }) {

  // Define el color del borde basado en el tipo
  const colorBorde = tipo === "Privado" ? "#E0B6B6" : "#D4D4A9";

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
    <div className="card shadow-sm" style={styleCard}>
      <img src={ImagenCarton} className="card-img-top" alt="Insumo" />
      <div style={styleCardBody}>
        <h5 className="card-title">Nombre del insumo</h5>
        <p className="card-text m-0">Cantidad disponible: N</p>
        <p className="card-text m-0">Ubicación: Jr de la Unión 573</p>
        <p className="card-text text-end"><b>Precio: S/50</b></p>
      </div>
    </div>
  );
}

export default Publicacion;