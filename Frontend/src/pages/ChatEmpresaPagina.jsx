import ChatComponente from '../components/ChatComponente'; 
import TransaccionPago from '../components/TransaccionPago.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function PaginaChatEmpresa() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />
        
        <div className="container my-5 flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-start">
              <TransaccionPago />
            </div>
            <div className="col-12 col-md-8 d-flex justify-content-start">
              <ChatComponente />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default PaginaChatEmpresa;