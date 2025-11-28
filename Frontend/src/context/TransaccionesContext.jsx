import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../services/api"; 
import { useCarrito } from "./CarritoContext";
import { useUsuario } from "./UsuarioContext";

const TransaccionesContext = createContext();

export function useTransacciones() {
     return useContext(TransaccionesContext);
}

export function TransaccionesProvider({ children }) {
     const [ordenCreada, setOrdenCreada] = useState(null);
     const [historial, setHistorial] = useState([]);
     const [loading, setLoading] = useState(false);
     
     const { vaciarCarrito } = useCarrito();
     const { usuario } = useUsuario();

     const crearOrden = async (datosUsuario, itemsCarrito, total) => {
          if (!usuario) return { success: false, message: "No hay usuario" };

          try {
               const ordenRequest = {
                    usuarioId: usuario.id,
                    direccionEntrega: datosUsuario.direccion || "Dirección registrada",
                    cciPago: "0011-1234-5678-9000",
                    items: itemsCarrito.map(item => ({
                         insumoId: item.insumo.id,
                         cantidad: item.cantidad
                    }))
               };

               console.log("Enviando orden...", ordenRequest);

               const response = await api.post('/ordenes', ordenRequest);
               
               console.log("Orden creada:", response.data);
               
               setOrdenCreada(response.data);
               vaciarCarrito();

               return { success: true, orden: response.data };

          } catch (error) {
               console.error("Error al crear orden:", error);
               return { 
                    success: false, 
                    message: error.response?.data || "Error al procesar la compra." 
               };
          }
     };

     const obtenerHistorial = useCallback(async () => {
        if (!usuario) return;
        
        try {
            setLoading(true);
            let url = '';

            if (usuario.rol === 'ADMIN') {
                url = '/ordenes'; 
            } else {
                url = `/ordenes/mis-ordenes/${usuario.id}`; 
            }

            const response = await api.get(url);
            setHistorial(response.data);

        } catch (error) {
            console.error("Error cargando historial:", error);
        } finally {
            setLoading(false);
        }
     }, [usuario]);

     return (
          <TransaccionesContext.Provider value={{
               ordenCreada, 
               crearOrden,
               historial,
               obtenerHistorial,
               loading
          }}>
               {children}
          </TransaccionesContext.Provider>
     )
}