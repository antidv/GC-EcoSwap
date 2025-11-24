import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext(null);

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const itemExistente = items.find((item) => item.producto.id === producto.id);

    if (itemExistente) {
      setItems(items.map((item) =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      setItems([...items, { producto, cantidad }]);
    }
    console.log("Item agregado:", producto.nombre, "Cantidad:", cantidad);
  };

  const eliminarDelCarrito = (productoId) => {
    setItems(items.filter((item) => item.producto.id !== productoId));
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const value = {
    items,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};