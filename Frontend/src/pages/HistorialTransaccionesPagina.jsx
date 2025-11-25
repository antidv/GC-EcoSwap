function HistorialTransacciones() {
  return (
    <>
      <div className="container-fluid min-vh-100 stylePantalla">
        {/* Espacio para Título y subtítulo */}
        <div className="row">
          <h1 className="text-center text-white mt-5">EcoSwap</h1>
          <h4 className="text-center text-white">Compra, vende, recicla</h4>
        </div>

        <div className="row">
          <div className="col-12">
               <h4 className="text-white ms-5">Historial de Transacciones</h4>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center">
            <div className="card" style={{ width: "85rem" }}>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID Transacción</th>
                      <th scope="col">Comprador</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Total</th>
                      <th scope="col">Código</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1234567</th>
                      <td>Nombre de empresa</td>
                      <td>4</td>
                      <td>S/200.00</td>
                      <td>2356</td>
                      <td>
                        <div>
                          <button className="btn btn-success">
                            Descargar cetificado
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistorialTransacciones;
