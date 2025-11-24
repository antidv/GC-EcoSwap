import React from 'react';
import ChatComponente from "../components/ChatComponente.jsx";
import TransaccionActual from "../components/TransaccionActual.jsx";
import Header from "../components/Header.jsx";
import { useChats } from '../context/ChatsContext.jsx';

function ChatPagina() {
  const { chatSeleccionado } = useChats() || {};

  return (
    <>
      <Header />
      
      <div className="container-fluid min-vh-100">
        <div className="row pt-4">
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
    </>
  );
}

export default ChatPagina;