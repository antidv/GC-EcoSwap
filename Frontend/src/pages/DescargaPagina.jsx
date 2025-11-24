import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTransacciones } from "../context/TransaccionesContext";
import { useReactToPrint } from "react-to-print";
import CertificadoDocumento from "./CertificadoPDF";

function PaginaDescarga() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transacciones } = useTransacciones();
  const componentRef = useRef();

  const styleBotonVolver = {
    backgroundColor: "#ffc107",
    color: "#333",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    padding: "8px 20px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "20px",
  };

  // Buscar la transacción de nuevo
  const transaccion = transacciones.find((t) => t.id === id);

  // Configurar para imprimir/guardar PDF
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Certificado_${id}`,
  });

  if (!transaccion) {
    return <div>Cargando datos o transacción no encontrada</div>;
  }

  return (
    <>
      <div className="container mt-4 mb-5">
        {/* Botonera superior */}
        <div className="d-flex justify-content-between mb-4 no-print">
          <button className="btn btn-secondary" style={styleBotonVolver} onClick={() => navigate(-1)}>
            &larr; Volver al inicio
          </button>
          <button className="btn btn-light fw-bold" onClick={handlePrint}>
            Imprimir / Guardar como PDF
          </button>
        </div>

        <div ref={componentRef}>
          <CertificadoDocumento transaccion={transaccion} />
        </div>

        <style>
          {`
          @media print {
            .no-print { display: none; }
            body { background-color: white; }
          }
        `}
        </style>
      </div>
    </>
  );
}

export default PaginaDescarga;
