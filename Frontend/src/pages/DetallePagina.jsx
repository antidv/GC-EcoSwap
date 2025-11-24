import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useUsuario } from "../context/UsuarioContext.jsx";
import Header from "../components/Header.jsx";

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
    backgroundColor: "#ffc107",
    color: "#333",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    padding: "8px 20px",
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '20px'
  };
  const styleContador = {
    display: "flex",
    alignItems: "center",
    background: esInvitado ? "#E9ECEF" : "white",
    color: esInvitado ? "#ADB5BD" : "black",
    borderRadius: "8px",
    padding: "5px 10px",
    width: "fit-content",
    border: esInvitado ? "1px solid #dee2e6" : "none"
  };
  const styleBotonContador = {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: esInvitado ? "not-allowed" : "pointer",
    color: esInvitado ? "#adb5bd" : "inherit",
  };

  const styleBotonComprar = {
    backgroundColor: esInvitado ? "#ccc" : "#D4D4A9",
    color: esInvitado ? "#666" : "#073801",
    fontWeight: "bold",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: esInvitado ? "not-allowed" : "pointer",
    opacity: esInvitado ? 0.7 : 1,
  };

  const handleAgregarProductoCarritoCompra = () => {
    if (esInvitado) return;
    agregarAlCarrito(producto, cantidad);
    setCantidad(1);
  };
  
  
  if (!producto) {
    return (
      <div className="container min-vh-100 text-center mt-5">
        <h2 className="text-white">Producto no encontrado</h2>
        <Link to="/" style={styleBotonVolver}>
          &larr; Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <Header />

      <div className="container">
        <Link to="/" style={styleBotonVolver}>
          &larr; Volver al inicio
        </Link>

        <div className="row mt-5 justify-content-center">
          <div className="col-12 col-md-5">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded shadow"
              style={{ border: "3px solid white" }}
            />
          </div>

          <div className="col-12 col-md-5">
            <h2 className="mb-3">{producto.nombre}</h2>
            <p style={{ fontSize: "1rem", opacity: 0.9 }}>
              {producto.descripcion}
            </p>
            <hr />
            <p>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p>
              <strong>Cantidad disponible:</strong> {producto.cantidad}
            </p>
            <p>
              <strong>Ubicación:</strong> {producto.ubicacion}
            </p>
            <h4 className="mt-2">
              <strong>Precio: {producto.precio}</strong>
            </h4>

            {/* CONTADOR */}
            <div className="my-4">
              <div style={styleContador}>
                <button
                  style={styleBotonContador}
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  disabled={esInvitado}
                >
                  -
                </button>
                <span style={{ margin: "0 15px", fontSize: "1.2rem" }}>
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
            </div>

            <button
              style={styleBotonComprar}
              onClick={handleAgregarProductoCarritoCompra}
              disabled={esInvitado}
            >
              {esInvitado ? "Inicia sesión para comprar" : "Agregar compra"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginaDetalle;
