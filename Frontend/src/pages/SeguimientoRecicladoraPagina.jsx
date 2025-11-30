import Header from "../components/Header";
import Footer from "../components/Footer";
import EstadoEnvio from "../components/EstadoEnvio";
import LISTA_ESTADOS from "../data/mockEstados.js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SeguimientoRecicladoraPagina() {
  const [indiceActivo] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const datosTransaccion = location.state?.datosTransaccion;

  const avanzarCertificadoReciclador = () => {
    navigate(`/certificado/${datosTransaccion?.id || "transaccion-id"}`, {
      state: { datosTransaccion: datosTransaccion },
    });
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        {/* Seguimiento */}

        <div className="container my-5 flex-grow-1">
          <h2 className="text-black">Seguimiento de envío</h2>
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
          {indiceActivo === 3 ? (
            <div className="my-2 d-flex justify-content-center">
              <button
                className="btn btn-success colorVerdeClaro text-white"
                style={{ height: "50px" }}
                onClick={avanzarCertificadoReciclador}
              >
                Ver transacción
              </button>
            </div>
          ) : (
            <div className="my-2 d-flex justify-content-center">
              <p className="text-black">Esperando respuesta del administrador...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default SeguimientoRecicladoraPagina;
