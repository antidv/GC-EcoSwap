import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext.jsx'
import { UsuarioProvider } from './context/UsuarioContext.jsx';
import { TransaccionesProvider } from './context/TransaccionesContext.jsx';
import { InventarioProvider } from './context/InventarioContext.jsx';
import { ChatsProvider } from './context/ChatsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <CarritoProvider> 
          <TransaccionesProvider>
            <InventarioProvider>
              <ChatsProvider>
                <App />
              </ChatsProvider>
            </InventarioProvider>
          </TransaccionesProvider>
        </CarritoProvider>
      </UsuarioProvider>
    </BrowserRouter>
  </StrictMode>,
)
