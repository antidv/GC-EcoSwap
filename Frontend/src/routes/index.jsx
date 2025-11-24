import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from '../pages/PrincipalPagina.jsx';
import PaginaDetalle from '../pages/DetallePagina.jsx';
import PaginaDescarga from '../pages/DescargaPagina.jsx';
import PaginaCarrito from '../pages/CarritoPagina.jsx';
import PaginaChatEmpresa from '../pages/ChatEmpresaPagina.jsx'
import HistorialCertificadosPagina from '../pages/HistorialCertificadosPagina.jsx';
import PaginaCertificado from '../pages/CertificadoPagina.jsx';
import InicioSesion from '../pages/InicioSesionPagina.jsx';
import CrearCuenta from '../pages/CrearCuentaPagina.jsx';
import CertificadoDocumento from '../pages/CertificadoPDF.jsx';

{/* Del admin */}
import Inventario from '../pages/InventarioPagina.jsx';
import PublicarInsumo from '../pages/PublicarInsumoPagina.jsx';
import ChatPagina from '../pages/ChatPagina.jsx';
import PagoExitoso from '../pages/PagoExistosoPagina.jsx';
import HistorialTransacciones from '../pages/HistorialTransaccionesPagina.jsx';

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
      {/* Falta arreglar esto, siempre manda a Pagina Principal xd, debe ser por rol */}
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

      <Route
        path='/descargar-certificado/:id'
        element={<PaginaDescarga />}
      />

      {/* Admin */}

      <Route
        path='/inventario'
        element={<Inventario />}
      />

      <Route
        path='/publicar-insumo'
        element={<PublicarInsumo />}
      />

      <Route
        path='/chat-admin'
        element={<ChatPagina />}
      />

      <Route
        path='/pago-exitoso/:id'
        element={<PagoExitoso />}
      />

      <Route
        path='/pago-exitoso/:id'
        element={<PagoExitoso />}
      />

      {/* Esto se tiene que editar respecto al rol, uno sería filtrado */}
      <Route
        path='/historial-transacciones'
        element={<HistorialCertificadosPagina />}
      />

    </Routes>
  );
}

export default AppRoutes;