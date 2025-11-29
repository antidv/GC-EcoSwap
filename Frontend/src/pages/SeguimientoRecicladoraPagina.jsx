import Header from "../components/Header";
import Footer from "../components/Footer";
import EstadoEnvio from "../components/EstadoEnvio";
import LISTA_ESTADOS from "../data/mockEstados.js";

function SeguimientoRecicladoraPagina() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        {/* Seguimiento */}

        <div className="container my-5 flex-grow-1">
          <h2 className="text-black">Seguimiento de envío</h2>
          <div className="row">
            {LISTA_ESTADOS.map((estado) => (
              <EstadoEnvio
                key={estado.id}
                imagen={estado.imagen}
                nombre={estado.nombre}
                descripcion={estado.descripcion}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default SeguimientoRecicladoraPagina;
