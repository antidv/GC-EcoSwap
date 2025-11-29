import React from 'react';
import ChatComponente from "../components/ChatComponente.jsx";
import TransaccionActual from "../components/TransaccionActual.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useChats } from '../context/ChatsContext.jsx';

function ChatPagina() {
  const { chatSeleccionado } = useChats() || {};

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />
        
        <div className="container my-5 flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-start">
              <TransaccionActual datos={chatSeleccionado} />
            </div>
            <div className="col-12 col-md-8 d-flex justify-content-start">
              {chatSeleccionado ? (
                  <ChatComponente />
              ) : (
                <div className="d-flex align-items-center justify-content-center border rounded bg-light text-muted w-100" style={{height: '500px', maxWidth: '45rem'}}>
                    Selecciona una empresa del menú ($) para chatear
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default ChatPagina;