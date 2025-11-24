import React, { createContext, useState, useContext } from 'react';

const UsuarioContext = createContext(null);

export const useUsuario = () => {
     return useContext(UsuarioContext);
}

export const UsuarioProvider = ({children}) => {
     const [usuario, setUsuario] = useState(null);

     const login = (datosUsuario) => {
          setUsuario(datosUsuario);
     };

     const logout = () => {
          setUsuario(null);
     }

     return (
          <UsuarioContext.Provider value={{usuario, login, logout}}>
               {children}
          </UsuarioContext.Provider>
     );
};