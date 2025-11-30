import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useUsuario } from './UsuarioContext';

const InventarioContext = createContext(null);

export const useInventario = () => useContext(InventarioContext);

export const InventarioProvider = ({ children }) => {
  const { usuario } = useUsuario();
  const [listaPublicaciones, setListaPublicaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarInsumos = useCallback(async () => {
    try {
      setLoading(true);
      let url = '/insumos/publicos';

      if (usuario?.rol === 'ADMIN') {
        url = '/insumos';
      }

      console.log(`Cargando inventario desde: ${url} para rol: ${usuario?.rol}`);
      
      const response = await api.get(url);
      setListaPublicaciones(response.data);

    } catch (error) {
      console.error("Error cargando inventario:", error);
      setListaPublicaciones([]);
    } finally {
      setLoading(false);
    }
  }, [usuario]);

  useEffect(() => {
    cargarInsumos();
  }, [cargarInsumos]);


  const agregarPublicacion = async (nuevaPublicacion) => {
    try {
      await api.post('/insumos', nuevaPublicacion);
      
      await cargarInsumos(); 
      return { success: true };
    } catch (error) {
      console.error("Error al crear insumo:", error);
      return { success: false, message: "No se pudo crear la publicación." };
    }
  };

  const cambiarEstadoPublicacion = async (id) => {
    try {
      await api.put(`/insumos/${id}/estado`);
      
      setListaPublicaciones(prevLista => 
        prevLista.map(item => {
          if (item.id === id) {
            const nuevoEstado = item.estado === 'PRIVADO' ? 'DISPONIBLE' : 'PRIVADO';
            return { ...item, estado: nuevoEstado };
          }
          return item;
        })
      );
      return { success: true };
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      return { success: false, message: "Error al actualizar estado." };
    }
  };

  return (
    <InventarioContext.Provider value={{ 
      listaPublicaciones, 
      loading,
      agregarPublicacion, 
      cambiarEstadoPublicacion,
      recargarInventario: cargarInsumos 
    }}>
      {children}
    </InventarioContext.Provider>
  );
};