import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext.jsx';

// Importación de Páginas
import PaginaPrincipal from '../pages/PrincipalPagina.jsx';
import PaginaDetalle from '../pages/DetallePagina.jsx';
import PaginaDescarga from '../pages/DescargaPagina.jsx';
import PaginaCarrito from '../pages/CarritoPagina.jsx';
import PaginaChatEmpresa from '../pages/ChatEmpresaPagina.jsx'
import HistorialCertificadosPagina from '../pages/HistorialCertificadosPagina.jsx';
import QuienesSomos from '../pages/QuienesSomosPagina.jsx';
import ComoComprar from '../pages/ComoComprarPagina.jsx';
import PaginaCertificado from '../pages/CertificadoPagina.jsx';
import InicioSesion from '../pages/InicioSesionPagina.jsx';
import CrearCuenta from '../pages/CrearCuentaPagina.jsx';

import Inventario from '../pages/InventarioPagina.jsx';
import PublicarInsumo from '../pages/PublicarInsumoPagina.jsx';
import ChatPagina from '../pages/ChatPagina.jsx';
import PagoExitoso from '../pages/PagoExistosoPagina.jsx';

const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario, loading } = useUsuario();

  if (loading) return <div>Cargando...</div>;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* --- RUTAS PÚBLICAS (Cualquiera puede entrar) --- */}
      <Route path='/login' element={<InicioSesion />}/>
      <Route path='/crear-cuenta' element={<CrearCuenta />}/> 
      <Route path='/sign-up' element={<CrearCuenta />}/>
      
      <Route path="/" element={<PaginaPrincipal />}/>
      <Route path="/detalle/:id" element={<PaginaDetalle />}/>
      <Route path="/quienes-somos" element={<QuienesSomos />}/>
      <Route path="/como-comprar" element={<ComoComprar />}/>

      {/* --- RUTAS DE RECICLADORA (Cliente) --- */}
      {/* Aquí corregimos 'empresa' por 'RECICLADORA' */}
      <Route element={<RutaProtegida rolesPermitidos={['RECICLADORA']} />}>
        <Route path="/carrito" element={<PaginaCarrito />}/>
        <Route path="/chat-empresa" element={<PaginaChatEmpresa />}/>
        <Route path="/historial-certificados" element={<HistorialCertificadosPagina />}/>
        <Route path="/certificado/:id" element={<PaginaCertificado />}/>
        <Route path='/descargar-certificado/:id' element={<PaginaDescarga />}/>
        
        {/* Flujo de pago */}
        <Route path='/pago-exitoso/:id' element={<PagoExitoso />}/>
      </Route>

      {/* --- RUTAS DE ADMIN (GreenCycle) --- */}
      {/* Aquí corregimos 'admin' por 'ADMIN' */}
      <Route element={<RutaProtegida rolesPermitidos={['ADMIN']} />}>
        <Route path='/inventario' element={<Inventario />}/>
        <Route path='/publicar-insumo' element={<PublicarInsumo />}/>
        <Route path='/chat-admin' element={<ChatPagina />}/>
        {/* El admin también podría ver historiales si fuera necesario */}
      </Route>

      {/* --- CATCH-ALL (Error 404) --- */}
      <Route path='*' element={<Navigate to="/" replace />}/>

    </Routes>
  );
}

export default AppRoutes;