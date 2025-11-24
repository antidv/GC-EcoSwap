import { createContext, useContext, useState } from "react";
import { MOCK_TRANSACCIONES } from "../data/mockTransacciones";

const TransaccionesContext = createContext();

export function useTransacciones() {
     return useContext(TransaccionesContext);
}

export function TransaccionesProvider({ children }) {
     const [transacciones, setTransacciones] = useState(MOCK_TRANSACCIONES);

     const agregarTransaccion = (nuevaTransaccion) => {
          setTransacciones((prev) => [nuevaTransaccion, ...prev]);
     };

     return (
          <TransaccionesContext.Provider value={{transacciones, agregarTransaccion}}>
               {children}
          </TransaccionesContext.Provider>
     )
}