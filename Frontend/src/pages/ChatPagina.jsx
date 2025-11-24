import ChatComponente from "../components/ChatComponente";
import TransaccionActual from "../components/TransaccionActual";
import Header from "../components/Header";

function ChatPagina() {
  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="container-fluid min-vh-100 stylePantalla">
        {/* Espacio para Título y subtítulo */}
        <div className="row">
          <h1 className="text-center text-white mt-5">EcoSwap</h1>
          <h4 className="text-center text-white">Compra, vende, recicla</h4>
        </div>

        <div className="row">
          <div className="col-4 d-flex justify-content-end align-items-center">
               <TransaccionActual></TransaccionActual>
          </div>
          <div className="col-8 d-flex justify-content-start">
               <ChatComponente></ChatComponente>
          </div>
        </div>

      </div>
    </>
  );
}

export default ChatPagina;
