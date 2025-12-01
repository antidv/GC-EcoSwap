import React from "react";

const CertificadoDocumento = ({ transaccion }) => {
  if (!transaccion) return null;

  let metricas;

  if (transaccion.metricas) {
    // CASO IDEAL: Usamos los datos precisos de Spring Boot
    metricas = {
      residuos: transaccion.metricas.residuos,
      co2: transaccion.metricas.co2,
      agua: transaccion.metricas.agua,
      ahorro: transaccion.metricas.ahorro
    };
  } else {
    // FALLBACK: Por si la data viene incompleta, calculamos aproximados (Tu lógica original)
    // Nota: Usamos Number() para asegurar que no sea texto
    const cantidad = Number(transaccion.cantidad) || 0;
    const total = Number(transaccion.total) || 0;
    
    metricas = {
      residuos: (cantidad * 0.5).toFixed(1), 
      co2: (cantidad * 1.2).toFixed(1), 
      agua: (cantidad * 50).toFixed(0), 
      ahorro: (total * 0.15).toFixed(2), 
    };
  }

  // Generación del QR con los datos reales
  const qrData = `Transacción: ${transaccion.id}, Total: S/${transaccion.total}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

  return (
    <>
      <div
        id="certificado-imprimible"
        className="bg-white p-5 mx-auto colorVerdeOscuro"
        style={{ maxWidth: "800px", border: "1px solid #ddd" }}
      >
        {/* Encabezado */}
        <div
          className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4"
          style={{ borderColor: "#4CAF50" }}
        >
          <div>
            <h1
              className="text-success fw-bold text-uppercase mb-0"
              style={{ fontSize: "2rem" }}
            >
              Certificado de Impacto
            </h1>
            <p className="text-muted mb-0">
              Operación de Economía Circular
            </p>
          </div>
          <div className="text-end text-muted small">
            <p className="mb-0">Fecha de emisión</p>
            {/* Si el backend manda fecha, úsala, si no, usa la actual */}
            <p className="fw-bold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Cuerpo Principal */}
        <div className="row">
          {/* Detalles de Operación */}
          <div className="col-md-7">
            <h5 className="fw-bold mb-3 text-dark">
              Detalles de la Operación
            </h5>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item d-flex justify-content-between ps-0">
                <span className="fw-bold text-secondary">
                  ID Transacción:
                </span>
                <span>{transaccion.id}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between ps-0">
                <span className="fw-bold text-secondary">
                  Código Verif.:
                </span>
                <span className="font-monospace">{transaccion.codigo}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between ps-0">
                <span className="fw-bold text-secondary">Comprador:</span>
                <span>{transaccion.comprador}</span>
              </li>
              <li className="list-group-item ps-0">
                <span className="fw-bold text-secondary d-block">
                  Insumos:
                </span>
                <span className="d-block mt-1">{transaccion.producto}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between ps-0">
                <span className="fw-bold text-secondary">
                  Inversión Total:
                </span>
                <span className="fw-bold text-success">
                  S/ {Number(transaccion.total).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>

          {/* QR y Sello */}
          <div className="col-md-5 text-center d-flex flex-column justify-content-center align-items-center">
            <div className="p-2 border rounded mb-2 bg-light">
              <img
                src={qrUrl}
                alt="QR Código"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
            <small className="text-muted">Escanear para verificar</small>
          </div>
        </div>

        {/* Métricas Ambientales - Diseño destacado */}
        <div
          className="mt-4 p-4 rounded"
          style={{
            backgroundColor: "#f1f8e9",
            border: "1px solid #c5e1a5",
          }}
        >
          <h4
            className="text-center fw-bold mb-4"
            style={{ color: "#33691e" }}
          >
            Impacto Ambiental Generado
          </h4>

          <div className="row text-center">
            <div className="col-4 mb-3">
              <div className="fs-2">♻️</div>
              <div className="fw-bold fs-5 text-black">
                {metricas.residuos} kg
              </div>
              <small className="text-muted">Residuos Evitados</small>
            </div>
            <div className="col-4 mb-3">
              <div className="fs-2">🌍</div>
              <div className="fw-bold fs-5 text-black">
                {metricas.co2} kg
              </div>
              <small className="text-muted">CO₂ Ahorrado</small>
            </div>
            <div className="col-4 mb-3">
              <div className="fs-2">💧</div>
              <div className="fw-bold fs-5 text-black">
                {metricas.agua} L
              </div>
              <small className="text-muted">Agua Preservada</small>
            </div>
          </div>

          <hr style={{ borderColor: "#a5d6a7" }} />

          <div className="text-center">
            <span className="text-muted me-2">
              Ahorro Económico Estimado:
            </span>
            <span className="fw-bold text-success fs-5">
              S/ {metricas.ahorro}
            </span>
          </div>
        </div>

        {/* Footer / Mensaje */}
        <div
          className="mt-4 pt-3 border-top text-center text-muted"
          style={{ fontSize: "0.75rem" }}
        >
          Certificado generado digitalmente por EcoSwap.
        </div>
      </div>
    </>
  );
};

export default CertificadoDocumento;