import "./TransaccionPagada.css";

function TransaccionPagada() {
  return (
    <>
      <div className="card" style={{ width: "45rem" }}>
        <div className="card-body py-5">
          <h5 className="card-title text-center"><b>Transacción N° 1234567</b></h5>
          <h6 className="card-text text-center">
            Código de verificación: 3256
          </h6>

          <div className="row">
            <div className="col-7 mt-3 ms-3">
              <p className="card-text ms-5">
                <b>Comprador:</b> Juan Perez
              </p>
              <p className="card-text ms-5">
                <b>Productos:</b> Cartón, Papel, etc.
              </p>
              <p className="card-text ms-5">
                <b>Ubicación:</b> Jr de la Unión 573
              </p>
              <p className="card-text ms-5">
                <b>Precio:</b> S/50
              </p>
            </div>
            <div className="col-3 d-flex justify-content-center align-items-center">
               <img src="https://marketplace.canva.com/659KM/MADxJx659KM/1/tl/canva-check-mark-vector-icon-MADxJx659KM.png" alt="check" style={{height:"10rem", width:"10rem"}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransaccionPagada;
