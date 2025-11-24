function TransaccionActual() {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Transacción actual</h5>
          <p className="card-text m-0">
            <b>Comprador:</b> Juan Perez
          </p>
          <p className="card-text m-0">
            <b>Productos:</b> Cartón, Papel, etc.
          </p>
          <p className="card-text m-0">
            <b>Ubicación:</b> Jr de la Unión 573
          </p>
          <p className="card-text mt-3">
            <b>Precio:</b> S/50
          </p>

          <h5 className="text-center">Esperando pago...</h5>
        </div>
      </div>
    </>
  );
}

export default TransaccionActual;
