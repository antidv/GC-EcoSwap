import ChatComponente from '../components/ChatComponente'; 
import TransaccionPago from '../components/TransaccionPago.jsx';
import Header from '../components/Header.jsx';

function PaginaChatEmpresa() {
  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="container-fluid">
        <div className="row justify-content-center pt-4">
          <div className="col-12 col-md-4 d-flex justify-content-end align-items-start">
            <TransaccionPago />
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-start">
            <ChatComponente />
          </div>
        </div>
        
      </div>
    </>
  );
}

export default PaginaChatEmpresa;