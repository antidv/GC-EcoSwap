import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoEcoSwap from "../assets/logo_ecoswap.png";

import { useCarrito } from "../context/CarritoContext.jsx";
import { useUsuario } from "../context/UsuarioContext.jsx";
import { useChats } from "../context/ChatsContext.jsx";

const Header = () => {
  const navigate = useNavigate();

  const { usuario, logout } = useUsuario() || {};
  
  const rol = usuario?.rol; 

  const { items = [] } = useCarrito() || {};
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const { chatsActivos = [], seleccionarChat } = useChats() || {};
  
  const rutaLogo = rol === "ADMIN" ? "/inventario" : "/";

  const handleSeleccionarEmpresa = (chat) => {
    if (seleccionarChat) {
      seleccionarChat(chat);
      navigate("/chat-admin");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (logout) logout();
    navigate("/");
  };

  // --- ESTILOS ---
  const styleHeader = {
    backgroundColor: "#198754",
    color: "white",
    padding: "0.7rem 3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const styleBrandContainer = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none",
    color: "white",
  };

  const styleLogo = {
    height: "45px",
    width: "auto",
    backgroundColor: "white",
    borderRadius: "5%",
    padding: "5px 10px",
  };

  const styleIcono = {
    background: "white",
    color: "#198754",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.3rem",
    cursor: "pointer",
    position: "relative",
    transition: "transform 0.2s",
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
    fontSize: "0.75rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  };

  return (
    <header style={styleHeader}>
      <div style={styleBrandContainer}>
        <Link to={rutaLogo} style={{ textDecoration: "none", color: "inherit" }}>
          <img src={LogoEcoSwap} alt="Logo Ecoswap" style={styleLogo} />
        </Link>
      </div>

      <div className="d-flex align-items-center gap-3">
        
        {/* --- VISTA RECICLADORA --- */}
        {rol === "RECICLADORA" && (
          <>
            <Link to="/carrito">
              <div style={styleIcono}>
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
                  <h6 className="dropdown-header text-uppercase text-success fw-bold">
                    {usuario.nombre}
                  </h6>
                  <span className="dropdown-item-text text-muted" style={{ fontSize: "0.9rem" }}>
                    {usuario.email}
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/historial-certificados">
                    Ver certificados
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* --- VISTA ADMIN --- */}
        {rol === "ADMIN" && (
          <>
            <div className="dropdown">
              <div
                style={styleIcono}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Empresas Pendientes"
              >
                <i className="bi bi-currency-dollar"></i>
                {chatsActivos.length > 0 && (
                  <span style={styleBadge}>{chatsActivos.length}</span>
                )}
              </div>
              <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: "250px" }}>
                <li><h6 className="dropdown-header">Transacciones Pendientes</h6></li>
                {chatsActivos.length > 0 ? (
                  chatsActivos.map((chat) => (
                    <li key={chat.id}>
                      <button
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        onClick={() => handleSeleccionarEmpresa(chat)}
                      >
                        <div className="text-truncate" style={{ maxWidth: "150px" }}>
                          {chat.comprador}
                        </div>
                        <span className="badge bg-success ms-2">S/ {chat.total}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li><span className="dropdown-item text-muted">No hay pendientes</span></li>
                )}
              </ul>
            </div>

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
                  <h6 className="dropdown-header text-uppercase text-success fw-bold">
                    ADMINISTRADOR
                  </h6>
                  <span className="dropdown-item-text text-muted" style={{ fontSize: "0.9rem" }}>
                    {usuario.email}
                  </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/inventario">Ver inventario</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/historial-transacciones">Ver transacciones</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* --- VISTA INVITADO --- */}
        {!usuario && (
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-light fw-bold text-success">
              Ingresar
            </Link>
            <Link 
              to="/sign-up" 
              className="btn btn-outline-light fw-bold"
              style={{ border: "2px solid white" }}
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;