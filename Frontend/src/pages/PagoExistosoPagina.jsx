import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import TransaccionPagada from "../components/TransaccionPagada.jsx";
import Header from "../components/Header.jsx";
import { MOCK_TRANSACCIONES } from '../data/mockTransacciones.js';
import { MOCK_CHATS } from '../data/mockChats.js';

function PagoExitoso() {
  const { id } = useParams();
  const location = useLocation();

  let datosTransaccion = location.state?.datosTransaccion;
  
  if (!datosTransaccion) {
    datosTransaccion = MOCK_CHATS.find(t => 
      t.id === id || t.id === `T-${id}` || (t.id && t.id.includes(id))
    );
  }

  // Estilo para el botón naranja/amarillo
  const styleBotonVolver = {
    backgroundColor: '#198754', // Naranja
    color: 'white',
    border: 'none',
    padding: '10px 30px',
    borderRadius: '8px',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontSize: '1.1rem',
    display: 'inline-block',
    marginTop: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  return (
    <>
      <Header />

      {/* Contenedor principal */}
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center py-5" style={{minHeight: '85vh'}}>
        
        <div className="row w-100 justify-content-center">
          <div className="col-12 d-flex flex-column align-items-center">
            
            {datosTransaccion ? (
              <>
                {/* 1. La tarjeta de transacción */}
                <TransaccionPagada datos={datosTransaccion} />
                
                {/* 2. El botón "Volver" DEBAJO de la tarjeta */}
                <Link to="/inventario" style={styleBotonVolver}>
                    Volver
                </Link>
              </>
            ) : (
              // Caso de error (también centrado)
              <div className="text-white text-center">
                <h3 className="display-4 fw-bold">Transacción no encontrada</h3>
                <p className="lead">El ID {id} no existe en nuestros registros.</p>
                <Link to="/inventario" className="btn btn-light btn-lg mt-3 fw-bold">
                  <i className="bi bi-arrow-left me-2"></i> Volver al Inventario
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default PagoExitoso;