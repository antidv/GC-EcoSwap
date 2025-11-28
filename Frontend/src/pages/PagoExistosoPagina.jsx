import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function PagoExitoso() {
  const { id } = useParams();

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      
      <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center py-5">
        
        <div className="card shadow-lg p-5 border-success animate__animated animate__fadeInUp" style={{maxWidth: '500px', borderRadius: '15px'}}>
            <div className="mb-4">
                <div className="rounded-circle bg-success d-inline-flex justify-content-center align-items-center" style={{width: '100px', height: '100px'}}>
                    <i className="bi bi-check-lg text-white" style={{fontSize: '4rem'}}></i>
                </div>
            </div>
            
            <h2 className="text-success fw-bold mb-3">¡Compra Exitosa!</h2>
            <p className="text-muted fs-5">Tu orden ha sido registrada correctamente en nuestro sistema.</p>
            
            <div className="alert alert-light border my-4 py-3">
                <span className="text-uppercase small text-muted d-block">Número de Orden</span>
                <strong className="fs-3 text-dark">#{id}</strong>
            </div>

            <p className="small text-muted mb-4">
                El equipo de EcoSwap procesará tu solicitud. Puedes ver el detalle en tu historial.
            </p>

            <div className="d-grid gap-2">
                <Link to="/historial-certificados" className="btn btn-success btn-lg fw-bold">
                    <i className="bi bi-receipt me-2"></i> Ver mi Historial
                </Link>
                <Link to="/" className="btn btn-outline-secondary">
                    Volver al Inicio
                </Link>
            </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default PagoExitoso;