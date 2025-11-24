import React, { createContext, useState, useContext } from 'react';
import { MOCK_CHATS } from '../data/mockChats.js';

const ChatsContext = createContext(null);

export const useChats = () => useContext(ChatsContext);

export const ChatsProvider = ({ children }) => {
  // Inicializamos el estado con los datos del mock
  const [chatsActivos, setChatsActivos] = useState(MOCK_CHATS);

  // El chat que el admin tiene abierto actualmente
  const [chatSeleccionado, setChatSeleccionado] = useState(null);

  const seleccionarChat = (chat) => {
    setChatSeleccionado(chat);
  };

  // Función para que la empresa cree un nuevo chat al pagar (por las dudas)
  const crearNuevoChat = (datosPago) => {
    const nuevoChat = {
      id: `chat-${Date.now()}`,
      ...datosPago,
      estado: "pendiente"
    };
    // Agregamos el nuevo chat al principio de la lista
    setChatsActivos([nuevoChat, ...chatsActivos]);
  };

  return (
    <ChatsContext.Provider value={{ 
      chatsActivos, 
      chatSeleccionado, 
      seleccionarChat,
      crearNuevoChat
    }}>
      {children}
    </ChatsContext.Provider>
  );
};