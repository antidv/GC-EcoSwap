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
  />
);

function Inventario() {
  const [filtro, setFiltro] = useState("Todos");
  const navigate = useNavigate();

  const { listaPublicaciones, loading } = useInventario();

  const handleNuevaPublicacion = () => navigate("/publicar-insumo");

  const handleSetFiltro = (e, tipo) => {
    e.preventDefault();
    setFiltro(tipo);
  };

  const publicacionesFiltradas = listaPublicaciones.filter((pub) => {
    if (filtro === "Todos") return true;
    if (filtro === "Publico") return pub.estado === "DISPONIBLE";
    if (filtro === "Privado") return pub.estado === "PRIVADO";
    return true;
  });

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          <div className="row">
            <h2 className="text-center text-black mb-4">Mi inventario</h2>
          </div>
          <div className="row mb-4 mt-2">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <button
                className="btn btn-success me-3 shadow-sm"
                onClick={handleNuevaPublicacion}
              >
                <i className="bi bi-plus-lg me-2"></i> Nueva publicación
              </button>

              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle border shadow-sm colorVerdeOscuro"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-filter me-2"></i>{" "}
                  {filtro === "Todos" ? "Todos los estados" : filtro}
                </button>
                <ul className="dropdown-menu shadow">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={(e) => handleSetFiltro(e, "Todos")}
                    >
                      Todos
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={(e) => handleSetFiltro(e, "Publico")}
                    >
                      <ColorDot color="#198754" /> Público (Disponible)
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={(e) => handleSetFiltro(e, "Privado")}
                    >
                      <ColorDot color="#dc3545" /> Privado (Oculto)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            {loading && (
              <div className="col-12 text-center mt-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="text-muted mt-2">Cargando inventario...</p>
              </div>
            )}

            {!loading &&
              publicacionesFiltradas.length > 0 &&
              publicacionesFiltradas.map((pub) => (
                <div
                  className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                  key={pub.id}
                >
                  <Publicacion publicacion={pub} />
                </div>
              ))}

            {!loading && publicacionesFiltradas.length === 0 && (
              <div className="col-12 text-center mt-5 p-5 bg-light rounded border border-dashed">
                <h4 className="text-muted">No se encontraron publicaciones.</h4>
                <p className="text-secondary">
                  Intenta cambiar el filtro o crea una nueva.
                </p>
              </div>
            )}
          </div>

          {!loading && publicacionesFiltradas.length > 0 && (
            <div className="row mt-5 mb-5">
              <div className="col-12 text-center">
                <p className="text-muted small">— Fin de los resultados —</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer*/}
        <Footer />
      </div>
    </>
  );
}

export default Inventario;
