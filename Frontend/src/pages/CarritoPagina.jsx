import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useUsuario } from "../context/UsuarioContext.jsx";
import { useTransacciones } from "../context/TransaccionesContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ImagenDefault from '../assets/logo_ecoswap.png';

const FilaCarrito = ({ item, onEliminar }) => {
  const insumo = item.insumo; 
  
  const subtotal = (insumo.precioPorKg * item.cantidad);

  const handleImageError = (e) => { e.target.src = ImagenDefault; };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
      
      <div className="col-md-5 d-flex align-items-center">
        <img
          src={insumo.imagenUrl || ImagenDefault}
          alt={insumo.nombre}
          onError={handleImageError}
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
          className="me-3 rounded border"
        />
        <div>
            <h6 className="m-0 fw-bold">{insumo.nombre}</h6>
            <small className="text-muted">{insumo.categoria}</small>
        </div>
      </div>

      <div className="col-md-1 text-center">
        <span className="fw-bold">{item.cantidad}</span>
        <small className="d-block text-muted" style={{fontSize: '0.7rem'}}>unid/kg</small>
      </div>

      <div className="col-md-2 text-center">
        <span>S/ {insumo.precioPorKg.toFixed(2)}</span>
      </div>

      <div className="col-md-2 text-center">
        <span className="fw-bold text-success">S/ {subtotal.toFixed(2)}</span>
      </div>

      <div className="col-md-2 text-center">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onEliminar(item.id)}
          title="Quitar del carrito"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

function PaginaCarrito() {
  const navigate = useNavigate();
  
  const { items, eliminarDelCarrito } = useCarrito();
  const { usuario } = useUsuario();
  const { crearOrden } = useTransacciones();

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.insumo.precioPorKg * item.cantidad);
  }, 0);
  
  const total = subtotal;

  const handleConfirmarPedido = async () => {
    if (!usuario) {
        alert("Debes iniciar sesión para comprar.");
        navigate('/login');
        return;
    }

    const resultado = await crearOrden(usuario, items, total);

    if (resultado.success) {
       const idOrden = resultado.orden.id;
       
       navigate(`/pago-exitoso/${idOrden}`); 
    } else {
       alert("Error al procesar la compra: " + resultado.message);
    }
  };

  const styleContenedor = { padding: "2rem" };
  const styleTabla = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    color: "#333",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  };
  const styleResumen = {
    backgroundColor: "#ffffff",
    color: "#333",
    borderRadius: "8px",
    padding: "1.5rem",
    border: "1px solid #ddd"
  };
  const styleBotonComprar = {
    backgroundColor: "#198754",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    width: "100%",
    cursor: "pointer",
    transition: "background 0.3s"
  };

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />

      <div className="container my-5 flex-grow-1" style={styleContenedor}>
        <h2 className="text-white mb-4 fw-bold">Carro de compras</h2>
        
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="alert alert-light border-0 opacity-75 small">
                <i className="bi bi-info-circle me-2"></i>
                Los productos de tu carro de compras pueden agotarse. Confirma tu pedido pronto.
            </div>
            
            <div style={styleTabla}>
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light rounded-top fw-bold text-secondary">
                <div className="col-md-5">Insumo</div>
                <div className="col-md-1 text-center">Cant.</div>
                <div className="col-md-2 text-center">Precio</div>
                <div className="col-md-2 text-center">Subtotal</div>
                <div className="col-md-2 text-center">Acción</div>
              </div>

              {items.length === 0 ? (
                <div className="p-5 text-center">
                    <h4 className="text-muted mb-3">Tu carrito está vacío 🛒</h4>
                    <Link to="/" className="btn btn-success">Ir al catálogo</Link>
                </div>
              ) : (
                items.map((item) => (
                  <FilaCarrito
                    key={item.id}
                    item={item}
                    onEliminar={eliminarDelCarrito}
                  />
                ))
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div style={styleResumen} className="shadow-sm">
              <h4 className="fw-bold mb-4">Resumen de orden</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal:</span>
                <span className="fw-bold">S/ {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Impuestos estimados:</span>
                <span className="fw-bold">S/ 0.00</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between my-3 fs-5">
                <span className="fw-bold">Total a pagar:</span>
                <span className="fw-bold text-success">S/ {total.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleConfirmarPedido}
                style={{
                    ...styleBotonComprar, 
                    backgroundColor: items.length === 0 ? '#ccc' : '#198754',
                    cursor: items.length === 0 ? 'not-allowed' : 'pointer'
                }} 
                className="btn mt-3 shadow-sm"
                disabled={items.length === 0}
              >
                {items.length > 0 ? "Confirmar Pedido" : "Carrito Vacío"}
              </button>
              
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PaginaCarrito;