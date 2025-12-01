import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const UsuarioContext = createContext(null);

export const useUsuario = () => {
     return useContext(UsuarioContext);
}

export const UsuarioProvider = ({children}) => {
     const [usuario, setUsuario] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
        const tokenGuardado = localStorage.getItem('token');
        const datosGuardados = localStorage.getItem('datosUsuario');
        
        if (tokenGuardado && datosGuardados) {
            setUsuario(JSON.parse(datosGuardados));
        }
        setLoading(false);
     }, []);

     const cargarPerfil = async () => {
          let idUsuario = usuario?.id;
          if(!idUsuario) {
               const guardado = JSON.parse(localStorage.getItem('datosUsuario'));
               idUsuario = guardado?.id;
          }

          if (!idUsuario) return;

          try {
               const response = await api.get(`/usuarios/${idUsuario}`);

               const datosCompletos = { ...usuario, ...response.data};

               setUsuario(datosCompletos);

               localStorage.setItem('datosUsuario', JSON.stringify(datosCompletos));

               return { success: true, data: datosCompletos};
          } catch (error) {
               console.error("Error cargando perfil: ", error);
               return { success: false, message: "Erro al cargar los datos del perfil"};
          }
     }
     
     const actualizarPerfil = async (datosActualizados) => {
          if (!usuario?.id) return { success: false, message: "No hay sesión activa"};

          try {
               await api.put(`/usuarios/${usuario.id}`, datosActualizados);

               const nuevoEstado = { ...usuario, ...datosActualizados};
               setUsuario(nuevoEstado);
               localStorage.setItem('datosUsuario', JSON.stringify(nuevoEstado));
               return  { success: true};

          } catch (error) {
               console.error("Error al actualizar", error);
               return {
                    success: false,
                    message: error.response?.data || "Error al actualizar perfil"
               }
          }
     }

     const cambiarEmail = async(passwordActual, nuevoEmail) => {
          if (!usuario?.id) return { success: false, message: "No hay sesión activa"};

          try{
               await api.put(`/usuarios/${usuario.id}/email`, {
                    passwordActual: passwordActual,
                    nuevoEmail: nuevoEmail
               });

               const nuevoEstado = { ...usuario, email: nuevoEmail};
               setUsuario(nuevoEstado);
               localStorage.setItem('datosUsuario', JSON.stringify(nuevoEstado));

               return { success: true};
          } catch (error) {
               return { success: false, message: error.response?.data || "Error al cambiar email"};
          }
     }

     const cambiarPassword = async (passwordActual, nuevaPassword) => {
          if (!usuario?.id) return { success: false, message: "No hay sesión activa"};

          try {
               await api.put(`/usuarios/${usuario.id}/password`, {
                    passwordActual: passwordActual,
                    nuevaPassword: nuevaPassword
               });

               return { success: true };
          } catch(error) {
               return {success: false, message: error.response?.data || "Error al cambiar contraseña"};
          }
     }

     const login = async (email, password) => {
          try {
              const response = await api.post('/auth/login', { email, password });
              
              console.log("Respuesta del Login Backend:", response.data);

              const { token, usuario_id, rol, nombre, nombreEmpresa, direccion, telefono } = response.data;

              localStorage.setItem('token', token);
              
              const datosUsuario = {
                id: usuario_id,
                email,
                rol,
                nombre: nombreEmpresa || nombre || "Usuario EcoSwap",
                direccion: direccion || "Dirección no registrada",
                telefono: telefono || ""
               };
               
               localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
               
               setUsuario(datosUsuario);
               
               return { success: true };

          } catch (error) {
              console.error("Error al iniciar sesión:", error);
              return { 
                  success: false, 
                  message: error.response?.data || "Credenciales incorrectas o error de conexión." 
              };
          }
     };

     const registrar = async (datosRegistro) => {
          try {
               await api.post('/auth/register', datosRegistro);
               return { success: true };
          } catch (error) {
               console.error("Error al registrar:", error);
               return { 
                    success: false, 
                    message: error.response?.data || "Error al registrar usuario. Verifique los datos."
               };
          }
     };

     const logout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('datosUsuario');
          setUsuario(null);
     }

     return (
          <UsuarioContext.Provider value={{usuario, login, logout, registrar, cargarPerfil, actualizarPerfil, cambiarEmail, cambiarPassword, loading}}>
               {!loading && children}
          </UsuarioContext.Provider>
     );
};