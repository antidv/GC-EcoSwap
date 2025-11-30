import React from 'react';
import { useParams } from 'react-router-dom';
import ChatComponente from '../components/ChatComponente'; 
import TransaccionPago from '../components/TransaccionPago.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function PaginaChatEmpresa() {
  const { ordenId } = useParams();

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      
      <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-start mb-4 mb-md-0">
            <TransaccionPago ordenId={ordenId} />
          </div>
          
          <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-start">
            <ChatComponente ordenId={ordenId} />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PaginaChatEmpresa;