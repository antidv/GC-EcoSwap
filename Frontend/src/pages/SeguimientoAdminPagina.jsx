import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EstadoEnvio from "../components/EstadoEnvio";
import LISTA_ESTADOS from "../data/mockEstados.js";

function SeguimientoAdminPagina() {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const datosTransaccion = location.state?.datosTransaccion;

  const avanzarSiguienteEstado = () => {
    if (indiceActivo < LISTA_ESTADOS.length - 1) {
      setIndiceActivo(indiceActivo + 1);
    } else {
      navigate(`/pago-exitoso/${datosTransaccion?.id || "transaccion-id"}`, {
        state: { datosTransaccion: datosTransaccion },
      });
    }
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        {/* Seguimiento */}

        <div className="container my-5 flex-grow-1">
          <h2 className="text-black">Seguimiento de envío</h2>
          {datosTransaccion && (
               <p className="text-muted mb-4">
                    Orden para: {datosTransaccion.comprador}
               </p>
          )}

          <div className="row">
            {LISTA_ESTADOS.map((estado, index) => (
              <EstadoEnvio
                key={estado.id}
                imagen={estado.imagen}
                nombre={estado.nombre}
                descripcion={estado.descripcion}
                isSelected={index === indiceActivo}
              />
            ))}
          </div>
          <div className="my-2 d-flex justify-content-center">
            <button
              className="btn btn-success colorVerdeClaro text-white"
              style={{ height: "50px" }}
              onClick={avanzarSiguienteEstado}
            >
              {indiceActivo === LISTA_ESTADOS.length - 1
                ? "Ver transacción"
                : "Avanzar al siguiente estado"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default SeguimientoAdminPagina;
