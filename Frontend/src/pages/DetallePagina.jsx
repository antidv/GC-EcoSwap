import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useUsuario } from "../context/UsuarioContext.jsx";
import { useInventario } from "../context/InventarioContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ImagenDefault from '../assets/logo_ecoswap.png';

function PaginaDetalle() {
  const [cantidad, setCantidad] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { usuario } = useUsuario();
  const { agregarAlCarrito } = useCarrito();
  const { listaPublicaciones, loading } = useInventario();

  const producto = listaPublicaciones.find((p) => p.id === parseInt(id));

  const esInvitado = !usuario;
  const esAdmin = usuario?.rol === 'ADMIN';
  const esRecicladora = usuario?.rol === 'RECICLADORA';

  if (loading) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-success" role="status"></div>
            </div>
            <Footer />
        </div>
    );
  }

  if (!producto) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container flex-grow-1 text-center mt-5">
          <h2 className="text-black">Producto no encontrado</h2>
          <p className="text-muted">Es posible que este producto no exista o sea privado.</p>
          <Link to="/" className="btn btn-success mt-3">
            &larr; Volver al inicio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const styleContador = {
    background: "white",
    color: "black",
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
    cursor: "pointer",
  };

  const handleAgregarProductoCarritoCompra = () => {
    if (esInvitado) {
        navigate('/login');
        return;
    }
    if (esRecicladora) {
        agregarAlCarrito(producto, cantidad);
        alert("Producto agregado al carrito");
        setCantidad(1);
    }
  };

  const handleImageError = (e) => { e.target.src = ImagenDefault; };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          
          <div className="col-12 col-md-5">
            <img
              src={producto.imagenUrl || ImagenDefault}
              onError={handleImageError}
              alt={producto.nombre}
              className="img-fluid rounded shadow"
              style={{ border: "3px solid white", maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
          </div>

          <div className="col-12 col-md-5">
            <h2 className="mb-3 text-black fw-bold">{producto.nombre}</h2>
            
            <p className="text-muted" style={{ fontSize: "1.1rem" }}>
              {producto.descripcion}
            </p>
            
            <hr className="border-dark opacity-25 my-4" />
            
            <div className="mb-2">
                <span className="badge bg-secondary me-2">{producto.categoria}</span>
                <span className={`badge ${producto.estado === 'DISPONIBLE' ? 'bg-success' : 'bg-danger'}`}>
                    {producto.estado}
                </span>
            </div>

            <p className="text-black mb-1">
              <strong>Stock disponible:</strong> {producto.cantidadKg} kg
            </p>
            
            <h3 className="mt-3 text-success fw-bold">
              S/ {producto.precioPorKg} <span className="fs-6 text-muted">/ kg</span>
            </h3>

            {!esAdmin && (
                <div className="d-flex align-items-center gap-3 my-4 p-3 bg-light rounded">
                    
                    <div style={styleContador}>
                        <button
                        style={styleBotonContador}
                        onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                        > - </button>
                        
                        <span style={{ margin: "0 15px", fontSize: "1.2rem", fontWeight: 'bold' }}>
                        {cantidad}
                        </span>
                        
                        <button
                        style={styleBotonContador}
                        onClick={() => setCantidad((c) => c + 1)}
                        > + </button>
                    </div>
                    
                    <button
                        className={`btn ${esInvitado ? 'btn-primary' : 'btn-success'} flex-grow-1 fw-bold`}
                        style={{ height: "50px" }}
                        onClick={handleAgregarProductoCarritoCompra}
                    >
                        {esInvitado ? (
                            <>
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Inicia sesión para comprar
                            </>
                        ) : (
                            <>
                                <i className="bi bi-cart-plus me-2"></i>
                                Agregar al Carrito
                            </>
                        )}
                    </button>
                </div>
            )}

            {esAdmin && (
                <div className="alert alert-warning mt-4">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Eres Administrador. Puedes editar este producto desde el Inventario.
                </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PaginaDetalle;