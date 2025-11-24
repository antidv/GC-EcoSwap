import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from '../pages/PrincipalPagina.jsx';
import PaginaDetalle from '../pages/DetallePagina.jsx';
import PaginaCarrito from '../pages/CarritoPagina.jsx';
import PaginaChatEmpresa from '../pages/ChatEmpresaPagina.jsx'
import HistorialCertificadosPagina from '../pages/HistorialCertificadosPagina.jsx';
import PaginaCertificado from '../pages/CertificadoPagina.jsx';
import InicioSesion from '../pages/InicioSesionPagina.jsx';
import CrearCuenta from '../pages/CrearCuentaPagina.jsx';

function AppRoutes() {
  return (
    <Routes>
      {/* Ruta para la página de inicio de sesión */}
      <Route 
        path='/login'
        element={<InicioSesion />}
      />
      
      {/* Ruta para la página de crear cuenta */}
      <Route
        path='/sign-up'
        element={<CrearCuenta />}
      />

      {/* Ruta para la página de inicio */}
      <Route 
        path="/" 
        element={<PaginaPrincipal />} 
      />
      
      {/* Ruta dinámica para el detalle de un producto */}
      <Route 
        path="/detalle/:id" 
        element={<PaginaDetalle />} 
      />

      {/* Una ruta "catch-all" por si el usuario pone una URL no válida */}
      <Route 
        path="*" 
        element={<PaginaPrincipal />} 
      />

      <Route 
        path="/carrito" 
        element={<PaginaCarrito />} 
      />

      <Route 
        path="/chat-empresa" 
        element={<PaginaChatEmpresa />} 
      />

      <Route 
        path="/historial-certificados" 
        element={<HistorialCertificadosPagina />} 
      />

      <Route 
        path="/certificado/:id" 
        element={<PaginaCertificado />} 
      />
    </Routes>
  );
}

export default AppRoutes;