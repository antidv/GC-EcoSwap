import TransaccionPagada from "../components/TransaccionPagada";

function PagoExitoso() {
  return (
    <>
      <div className="container-fluid min-vh-100 stylePantalla">
        {/* Espacio para Título y subtítulo */}
        <div className="row">
          <h1 className="text-center text-white mt-5">EcoSwap</h1>
          <h4 className="text-center text-white">Compra, vende, recicla</h4>
        </div>

        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-center">
            <TransaccionPagada></TransaccionPagada>
          </div>
        </div>
      </div>
    </>
  );
}

export default PagoExitoso;
