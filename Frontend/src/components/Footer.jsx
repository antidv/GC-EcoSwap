import { Link } from "react-router-dom";
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

  // Definir correo y datos pre-llenados
  const email = "contacto@ecoswap.com";
  const subject = "Quiero vender insumos en Ecoswap";
  const body =
    "Hola, represento a la empresa [Nombre] y me gustaría vender los siguientes materiales: ...";

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <>
      <footer style={styleHeader}>
        {/* Información para el cliente */}
        <div className="row">
          <div className="col-4 col-md-4">
            <p>
              ¿Tienes algún residuo que se pueda reutilizar?<b> Contáctanos</b>
            </p>
            <a
              href={gmailLink}
              className="btn btn-outline-light w-100"
              role="button"
              target="_blank"
            >
              <i className="bi bi-envelope-fill me-2"></i>
              Enviar correo a Administración
            </a>

            <small>Te responderemos en menos de 24h.</small>
          </div>
          <div className="col-4 col-md-4">
            <p>
              <b>INFORMACIÓN PARA EL CLIENTE</b>
            </p>
            <ul className="list-unstyled">
              <li>
                <Link to="/quienes-somos" className="text-white">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link to="/como-comprar" className="text-white">
                  Cómo comprar
                </Link>
              </li>
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
