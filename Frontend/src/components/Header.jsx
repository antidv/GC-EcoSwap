import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";

const Header = () => {
  const { items } = useCarrito();
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  const styleHeader = {
    color: "white",
    padding: "1.5rem 2rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  };
  const styleLogoContainer = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  };
  const styleIcono = {
    background: "white",
    color: "black",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    cursor: "pointer",
    position: "relative",
  };
  const styleBadge = {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "red",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "0.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <header style={styleHeader}>
      <div style={styleLogoContainer}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>EcoSwap</h1>
          <h4 className="fw-normal">Compra, Vende, Recicla</h4>
        </Link>
      </div>

      <div className="d-flex">
        <Link to="/carrito">
          <div style={styleIcono} className="me-3">
            <i className="bi bi-cart"></i>
            {totalItems > 0 && <span style={styleBadge}>{totalItems}</span>}
          </div>
        </Link>
        <div className="dropdown">
          <div
            style={styleIcono}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person"></i>
          </div>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link className="dropdown-item" to="/historial-certificados">
                Ver certificados
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link to="/login" className="dropdown-item">
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
