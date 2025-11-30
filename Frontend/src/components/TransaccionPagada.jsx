import React from 'react';

function TransaccionPagada({ datos }) {
  
  // Protección si no hay datos
  if (!datos) return <div className="text-black">Cargando transacción...</div>;

  const styleCard = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "45rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  };

  const checkIconUrl = "https://cdn-icons-png.flaticon.com/512/148/148767.png";

  return (
    <div className="card" style={styleCard}>
      <div className="card-body py-5">
        {/* Encabezado de la tarjeta */}
        <h4 className="text-center fw-bold mb-2">Transacción N° {datos.id}</h4>
        <h6 className="text-center text-muted mb-4">
          Código de verificación: <strong>{datos.codigo}</strong>
        </h6>

        <div className="row align-items-center">
          {/* Columna de Datos */}
          <div className="col-md-8 ps-md-5">
            <div className="mb-2">
              <strong className="fs-5">Comprador:</strong>
              <div className="fs-5">{datos.comprador}</div>
            </div>
            
            <div className="mb-2">
              <strong className="fs-5">Producto:</strong>
              <div className="fs-5">
                {Array.isArray(datos.productos) 
                  ? datos.productos.map(p => `${p.cantidad}x ${p.nombre}`).join(", ")
                  : datos.producto || "Varios"}
              </div>
            </div>

            <div className="mb-2">
              <strong className="fs-5">Dirección:</strong>
              <div className="fs-5">{datos.direccion}</div>
            </div>

            <div className="mb-2">
              <strong className="fs-5">Monto Total:</strong>
              <div className="fs-4 fw-bold text-success">S/ {parseFloat(datos.total).toFixed(2)}</div>
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-center mt-4 mt-md-0">
            <img 
                src={checkIconUrl} 
                alt="Pago Exitoso" 
                style={{ width: "100px", height: "100px"}} 
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransaccionPagada;