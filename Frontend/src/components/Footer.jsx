function Footer() {
  const styleHeader = {
    backgroundColor: "#198754",
    color: "white",
    padding: "0.7rem 3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <>
      <footer style={styleHeader}>
        {/* Información para el cliente */}
        <div className="row">
          <div className="col-4 col-md-4">
            <p>
              ¿Tienes algún residuo que quieras vender?<b> Contáctanos</b>
            </p>
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tu correo electrónico"
                />
                <button
                  className="btn btn-dark"
                  type="button"
                  id="button-addon2"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div className="col-4 col-md-4">
            <p>
              <b>INFORMACIÓN PARA EL CLIENTE</b>
            </p>
            <ul className="list-unstyled">
              <li>Quiénes somos</li>
              <li>Cómo comprar</li>
            </ul>
          </div>
          <div className="col-4 col-md-4">
            <p>
              <b>@EcoSwap S.A.C</b>
            </p>
            <p>Privacidad Términos y condiciones</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
