import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useUsuario } from "../context/UsuarioContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";


// fetch(`/api/productos/${id}`)
import { MOCK_PUBLICACIONES } from "/src/data/mockData.js";

function PaginaDetalle() {
  const [cantidad, setCantidad] = useState(1);
  const { id } = useParams();
  const { usuario } = useUsuario();
  const { agregarAlCarrito } = useCarrito();

  const producto = MOCK_PUBLICACIONES.find((p) => p.id === parseInt(id));

  const esInvitado = !usuario || usuario.rol === "invitado";

  const styleBotonVolver = {
    backgroundColor: "#198754",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    padding: "8px 20px",
    textDecoration: "none",
    display: "inline-flex",
    float: "right",
    marginBottom: "20px",
  };
  const styleContador = {
    background: esInvitado ? "#aeaeaeff" : "white",
    color: esInvitado ? "#626569ff" : "black",
    borderRadius: "8px",
    padding: "5px 10px",
    width: "auto",
    border: "1px solid #2a2b2bff",
  };
  const styleBotonContador = {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: esInvitado ? "not-allowed" : "pointer",
    color: esInvitado ? "#626569ff" : "inherit",
  };

  const styleBotonComprar = {
    backgroundColor: esInvitado ? "#aeaeaeff" : "#198754",
    color: esInvitado ? "#131111ff" : "#ffffff",
    fontWeight: "bold",
    fontSize: "1.2rem",
    border: "1px solid #2a2b2bff",
    borderRadius: "8px",
    padding: "2px 20px",
    cursor: esInvitado ? "not-allowed" : "pointer",
    opacity: esInvitado ? 0.7 : 1,
    width: "fit-content",
    height: "50px",
  };

  const handleAgregarProductoCarritoCompra = () => {
    if (esInvitado) return;
    agregarAlCarrito(producto, cantidad);
    setCantidad(1);
  };

  if (!producto) {
    return (
      <div className="container min-vh-100 text-center mt-5">
        <h2 className="text-black">Producto no encontrado</h2>
        <Link to="/" style={styleBotonVolver}>
          &larr; Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-12 col-md-5">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded shadow colorVerdeOscuro"
                style={{ border: "3px solid white" }}
              />
            </div>

            <div className="col-12 col-md-5">
              <h2 className="mb-3 text-black">{producto.nombre}</h2>
              <p
                className="text-black"
                style={{ fontSize: "1rem", opacity: 0.9 }}
              >
                {producto.descripcion}
              </p>
              <hr className="border-dark opacity-100" />
              <p className="text-black">
                <strong>Categoría:</strong> {producto.categoria}
              </p>
              <p className="text-black">
                <strong>Disponible:</strong> {producto.cantidad}
              </p>
              <h4 className="mt-2 text-black">
                <strong>Precio: {producto.precio}</strong>
              </h4>

              {/* CONTADOR */}
              <div className="d-flex align-items-center gap-3 my-4">
                <div style={styleContador}>
                  <button
                    style={styleBotonContador}
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                    disabled={esInvitado}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px", fontSize: "1.2rem" }}>
                    {cantidad}
                  </span>
                  <button
                    style={styleBotonContador}
                    onClick={() => setCantidad((c) => c + 1)}
                    disabled={esInvitado}
                  >
                    +
                  </button>
                </div>
                
                <button
                  style={styleBotonComprar}
                  onClick={handleAgregarProductoCarritoCompra}
                  disabled={esInvitado}
                >
                  {esInvitado ? "Inicia sesión" : "Agregar compra"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <Footer />
      </div>
    </>
  );
}

export default PaginaDetalle;
