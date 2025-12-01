import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Conexión real

const ChatsContext = createContext(null);

export const useChats = () => useContext(ChatsContext);

export const ChatsProvider = ({ children }) => {
  const [chatsActivos, setChatsActivos] = useState([]);
  const [chatSeleccionado, setChatSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar la lista de órdenes (Chats) desde el Backend
  useEffect(() => {
    const obtenerChats = async () => {
      try {
        // Pedimos TODAS las órdenes. 
        // En un futuro podrías filtrar solo las que tienen estado 'PENDIENTE' o 'EN_PROCESO'
        const response = await api.get('/ordenes');
        
        // Mapeamos la respuesta para que sea fácil de leer en la lista visual
        const datosFormateados = response.data.map(orden => ({
            id: orden.id, 
            titulo: `Orden #${orden.id}`,
            usuarioNombre: orden.usuario?.nombre || "Cliente EcoSwap",
            estado: orden.estado,
            fecha: orden.fechaCompra,
            total: orden.montoTotal
        }));

        // Ordenamos: Las más recientes primero
        datosFormateados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        setChatsActivos(datosFormateados);
      } catch (error) {
        console.error("Error cargando la lista de chats:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerChats();
  }, []);

  const seleccionarChat = (chat) => {
    setChatSeleccionado(chat);
  };

  return (
    <ChatsContext.Provider value={{ 
      chatsActivos, 
      chatSeleccionado, 
      seleccionarChat,
      loading
    }}>
      {children}
    </ChatsContext.Provider>
  );
};