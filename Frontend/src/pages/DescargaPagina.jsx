import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useTransacciones } from "../context/TransaccionesContext";
import { useReactToPrint } from "react-to-print";
import CertificadoDocumento from "./CertificadoPDF";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PaginaDescarga() {
  const { id } = useParams();
  const { transacciones } = useTransacciones();
  const componentRef = useRef();

  const styleButtonPrint = {
    height: "50px"
  }

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
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          <div ref={componentRef}>
            <CertificadoDocumento transaccion={transaccion} />
          </div>

          <div className="d-flex justify-content-center mt-5 no-print">
            <button style={styleButtonPrint} className="btn btn-light fw-bold colorVerdeOscuro" onClick={handlePrint}>
              Imprimir / Guardar como PDF
            </button>
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

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default PaginaDescarga;
