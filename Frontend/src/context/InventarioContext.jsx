import React, { createContext, useState, useContext } from 'react';
import { MOCK_PUBLICACIONES } from '../data/mockData.js';

const InventarioContext = createContext(null);

export const useInventario = () => useContext(InventarioContext);

export const InventarioProvider = ({ children }) => {
  const [listaPublicaciones, setListaPublicaciones] = useState(MOCK_PUBLICACIONES);

  const agregarPublicacion = (nuevaPublicacion) => {
    const publicacionConId = { 
      ...nuevaPublicacion, 
      id: Date.now(), 
      cantidad: nuevaPublicacion.cantidad || "100 uni.", 
      ubicacion: nuevaPublicacion.ubicacion || "Almacén Central", 
      precio: nuevaPublicacion.precio || "S/ 0.00" 
    };
    
    setListaPublicaciones([publicacionConId, ...listaPublicaciones]);
  };

  return (
    <InventarioContext.Provider value={{ listaPublicaciones, agregarPublicacion }}>
      {children}
    </InventarioContext.Provider>
  );
};