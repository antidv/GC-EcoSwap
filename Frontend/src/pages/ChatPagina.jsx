import React from 'react';
import ChatComponente from "../components/ChatComponente.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useChats } from '../context/ChatsContext.jsx';

function ChatPagina() {
  const { chatsActivos, chatSeleccionado, seleccionarChat, loading } = useChats();

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        
        <div className="container my-5 flex-grow-1">
          <h2 className="mb-4 fw-bold text-success">Atención al Cliente</h2>
          
          <div className="row justify-content-center" style={{ minHeight: '500px' }}>
            
            {/* COLUMNA IZQUIERDA: Lista de Chats (Órdenes) */}
            <div className="col-12 col-md-4 mb-3">
                <div className="card shadow-sm h-100">
                    <div className="card-header bg-success text-white fw-bold">
                        Bandeja de Entrada
                    </div>
                    <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '500px' }}>
                        {loading && <div className="p-3 text-center">Cargando chats...</div>}
                        
                        {!loading && chatsActivos.length === 0 && (
                            <div className="p-3 text-center text-muted">No hay órdenes activas.</div>
                        )}

                        {chatsActivos.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => seleccionarChat(chat)}
                                className={`list-group-item list-group-item-action ${chatSeleccionado?.id === chat.id ? 'active bg-light border-start border-success border-4' : ''}`}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1 fw-bold text-dark">{chat.titulo}</h6>
                                    <small className={chatSeleccionado?.id === chat.id ? 'text-dark' : 'text-muted'}>
                                        {chat.estado}
                                    </small>
                                </div>
                                <p className="mb-1 small text-secondary">{chat.usuarioNombre}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA: El Chat Real */}
            <div className="col-12 col-md-8 d-flex justify-content-start">
              {chatSeleccionado ? (
                  // AQUÍ ESTÁ LA CLAVE: Le pasamos el ID real al componente
                  <ChatComponente ordenId={chatSeleccionado.id} />
              ) : (
                <div className="d-flex align-items-center justify-content-center border rounded bg-light text-muted w-100 shadow-sm" style={{height: '500px', maxWidth: '45rem'}}>
                   <div className="text-center">
                       <i className="bi bi-chat-dots fs-1 mb-3"></i>
                       <p>Selecciona una orden de la lista para ver el chat</p>
                   </div>
                </div>
              )}
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ChatPagina;