import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useUsuario } from './UsuarioContext';

const CarritoContext = createContext(null);

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { usuario } = useUsuario();

  const cargarCarrito = useCallback(async () => {
    if (!usuario || usuario.rol !== 'RECICLADORA') {
      setItems([]);
      return;
    }

    try {
      const response = await api.get('/carrito');
      setItems(response.data);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    }
  }, [usuario]);

  useEffect(() => {
    cargarCarrito();
  }, [cargarCarrito]);


  const agregarAlCarrito = async (producto, cantidad) => {
    if (!usuario) return;

    try {
      const payload = {
        insumoId: producto.id,
        cantidad: parseFloat(cantidad)
      };

      await api.post('/carrito/agregar', payload);
      
      await cargarCarrito(); 
      console.log("Producto agregado al carrito DB");

    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar producto. Intente nuevamente.");
    }
  };

  const eliminarDelCarrito = async (carritoItemId) => {
    try {
      await api.delete(`/carrito/${carritoItemId}`);
      
      setItems(prevItems => prevItems.filter(item => item.id !== carritoItemId));
      
    } catch (error) {
      console.error("Error al eliminar item:", error);
    }
  };

  const vaciarCarritoLocal = () => {
    setItems([]);
  };

  const value = {
    items,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito: vaciarCarritoLocal,
    recargarCarrito: cargarCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};