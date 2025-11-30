import { useCarrito } from "../context/CarritoContext";
import { useUsuario } from "../context/UsuarioContext";
import { useTransacciones } from "../context/TransaccionesContext";
import { useNavigate } from "react-router-dom";

function TransaccionPago() {
  // Obtener items del carrito global
  const { items, vaciarCarrito } = useCarrito();
  const { usuario } = useUsuario();
  const { agregarTransaccion } = useTransacciones();
  const navigate = useNavigate();

  const total = items.reduce((acc, item) => {
    const precio = parseFloat(item.producto.precio.replace("S/", ""));
    return acc + precio * item.cantidad;
  }, 0);

  const cantidadTotalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  // Estilos
  const styleCard = {
    backgroundColor: "white",
    color: "#333",
    borderRadius: "8px",
    padding: "1.5rem",
    width: "22rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const styleLista = {
    listStyleType: "none",
    paddingLeft: "0",
    margin: "5px 0",
    fontSize: "1rem",
    color: "#555",
  };

  const styleBotonPagar = {
    backgroundColor: "#198754",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    border: "2px solid #198754",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    width: "100%",
    marginTop: "1rem",
  };

  const handlePagar = () => {
    if (!usuario) {
      alert("Por favor, inicia sesión o regístrate para continuar con el pago");
      return;
    }
    
    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    
    // Genera ID y código aleatorio para simular transacción
    const nuevoId = `T${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const codigoVerificacion = Math.random().toString(36).substring(2, 10).toUpperCase();
    const listaProductosString = items.map(i => `${i.cantidad}x ${i.producto.nombre}`).join(', ');

    const nuevaTransaccion = {
      id: nuevoId,
      codigo: codigoVerificacion,
      comprador: usuario.nombre,
      producto: listaProductosString,
      cantidad: cantidadTotalItems,
      direccion: usuario.direccion,
      total: total.toFixed(2)
    };

    console.log(`Procesando pago de ${usuario.nombre}...`);
    
    agregarTransaccion(nuevaTransaccion)

    if(vaciarCarrito) vaciarCarrito();

    navigate(`/seguimiento/${nuevoId}`, {state: { datosTransaccion: nuevaTransaccion }});
  };

  return (
    <div className="card colorVerdeOscuro" style={styleCard}>
      <div className="card-body">
        <h5 className="card-title fw-bold text-center mb-3">
          Transacción actual
        </h5>
        <p className="card-text m-0 mt-3">
          <b>Comprador:</b> {usuario ? usuario.nombre : <span className="text-danger">Sin identificar</span>}
        </p>
        <div className="card-text m-0 mt-2">
          <b>Producto:</b>
          {items.length > 0 ? (
            <ul style={styleLista}>
              {items.map((item) => (
                <li key={item.producto.id}>
                  - {item.cantidad}x {item.producto.nombre}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted small m-0">
              No hay productos seleccionados
            </p>
          )}
        </div>
        <p className="card-text m-0 mt-3">
          <b>Dirección:</b> {usuario ? usuario.direccion : "---"}
        </p>
        <p className="card-text fw-bold mt-3">
          Total a pagar: S/ {total.toFixed(2)}
        </p>
        <p className="card-text m-0" style={{ fontSize: "0.9rem" }}>
          <b>CCI:</b> 12842334587348
        </p>

        <button style={styleBotonPagar} onClick={handlePagar}>
          Ver seguimiento
        </button>
      </div>
    </div>
  );
}

export default TransaccionPago;
