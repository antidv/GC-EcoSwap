// 1. CORREGIDO: Se cambió la ruta absoluta a una ruta relativa
import { useCarrito } from "../context/CarritoContext.jsx";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

const FilaCarrito = ({ item, onEliminar }) => {
  const producto = item.producto;
  const subtotal = parseFloat(producto.precio.replace("S/", "")) * item.cantidad;

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="col-md-5 d-flex align-items-center">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
          className="me-3 rounded"
        />
        <span>{producto.nombre}</span>
      </div>
      <div className="col-md-1 text-center">
        <span>{item.cantidad}</span>
      </div>
      <div className="col-md-2 text-center">
        <span>{producto.precio}</span>
      </div>
      <div className="col-md-2 text-center">
        <span>S/ {subtotal.toFixed(2)}</span>
      </div>
      <div className="col-md-2 text-center">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onEliminar(producto.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

// Página principal del Carrito
function PaginaCarrito() {
  const { items, eliminarDelCarrito } = useCarrito();

  // Calcular totales
  const subtotal = items.reduce((acc, item) => {
    const precio = parseFloat(item.producto.precio.replace("S/", ""));
    return acc + precio * item.cantidad;
  }, 0);
  const total = subtotal;

  // Estilos
  const styleContenedor = { padding: "2rem" };
  const styleTabla = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    color: "#333",
  };
  const styleResumen = {
    backgroundColor: "#D4D4A9",
    color: "#073801",
    borderRadius: "8px",
    padding: "1.5rem",
  };
  const styleBotonComprar = {
    backgroundColor: "#D4D4A9",
    color: "#073801",
    fontWeight: "bold",
    fontSize: "1.2rem",
    border: "2px solid #073801",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    width: "100%",
  };

  const styleBotonVolver = {
    backgroundColor: "#ffc107",
    color: "#333",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    padding: "8px 20px",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "20px",
  };

  return (
    <>
      {/* Header */}
      <Header />

      <div className="container" style={styleContenedor}>
        <Link to="/" style={styleBotonVolver}>&larr; Volver al Inicio</Link>
        <h2 className="text-white mb-4 mt-4">Carrito de compras</h2>
        <div className="row">
          {/* Columna Izquierda: Items */}
          <div className="col-md-8">
            <div style={styleTabla}>
              {/* Encabezados */}
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom fw-bold">
                <div className="col-md-5">
                  <span>Insumo</span>
                </div>
                <div className="col-md-1 text-center">
                  <span>Cantidad</span>
                </div>
                <div className="col-md-2 text-center">
                  <span>Precio</span>
                </div>
                <div className="col-md-2 text-center">
                  <span>Subtotal</span>
                </div>
                <div className="col-md-2 text-center">
                  <span>Acciones</span>
                </div>
              </div>
              {/* Items */}
              {items.length === 0 ? (
                <p className="p-3 text-center">Tu carrito está vacío.</p>
              ) : (
                items.map((item) => (
                  <FilaCarrito
                    key={item.producto.id}
                    item={item}
                    onEliminar={eliminarDelCarrito}
                  />
                ))
              )}
            </div>
          </div>

          {/* Columna Derecha: Resumen */}
          <div className="col-md-4">
            <div style={styleResumen}>
              <h4 className="fw-bold">Resumen</h4>
              <div className="d-flex justify-content-between my-3">
                <span>Subtotal:</span>
                <span className="fw-bold">S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between my-3">
                <span>Total pedido:</span>
                <span className="fw-bold">S/ {total.toFixed(2)}</span>
              </div>

              <Link
                to="/chat-empresa"
                style={styleBotonComprar}
                className="btn mt-3"
              >
                Comprar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginaCarrito;
