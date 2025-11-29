import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Publicacion from "../components/PublicacionInventario.jsx";
import { useInventario } from "../context/InventarioContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const ColorDot = ({ color }) => (
  <span
    style={{
      height: "10px",
      width: "10px",
      backgroundColor: color,
      borderRadius: "50%",
      display: "inline-block",
      marginRight: "8px",
    }}
  ></span>
);

function Inventario() {
  const [filtro, setFiltro] = useState("Todos");
  const navigate = useNavigate();
  const { listaPublicaciones } = useInventario();

  const handleNuevaPublicacion = () => {
    navigate("/publicar-insumo");
  };

  const handleSetFiltro = (e, tipo) => {
    e.preventDefault();
    setFiltro(tipo);
  };

  const publicacionesFiltradas = listaPublicaciones.filter((pub) => {
    if (filtro === "Todos") return true;
    return pub.tipo === filtro;
  });

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          {/* Fila de Botones y Filtros */}
          <div className="row">
            <div className="col-12 d-flex align-items-center">
              <button
                className="btn btn-light me-3 colorVerdeOscuro"
                onClick={handleNuevaPublicacion}
              >
                <i className="bi bi-plus-lg"></i> Nueva publicación
              </button>

              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle colorVerdeOscuro"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-filter"></i> {filtro}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => handleSetFiltro(e, "Todos")}
                    >
                      Todos
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => handleSetFiltro(e, "Publico")}
                    >
                      <ColorDot color="#D4D4A9" /> Público
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => handleSetFiltro(e, "Privado")}
                    >
                      <ColorDot color="#E0B6B6" /> Privado
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Área de Publicaciones */}
          <div className="row my-5">
            {publicacionesFiltradas.length > 0 ? (
              publicacionesFiltradas.map((pub) => (
                <div
                  className="col-12 col-md-6 col-lg-4 col-xl-3 mb-5"
                  key={pub.id}
                >
                  <Publicacion publicacion={pub} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center my-3">
                <h4 className="text-white-50">
                  No hay publicaciones en esta categoría.
                </h4>
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <p className="text-black m-0">No hay más para mostrar...</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Inventario;
