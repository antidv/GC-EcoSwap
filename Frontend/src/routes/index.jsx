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
import SeguimientoAdminPagina from "../pages/SeguimientoAdminPagina";
import SeguimientoRecicladoraPagina from "../pages/SeguimientoRecicladoraPagina";
import DatosUsuarioPagina from '../pages/DatosUsuarioPagina.jsx';

import Inventario from '../pages/InventarioPagina.jsx';
import PublicarInsumo from '../pages/PublicarInsumoPagina.jsx';
import ChatPagina from '../pages/ChatPagina.jsx';
import PagoExitoso from '../pages/PagoExistosoPagina.jsx';
import EditarInsumo from '../pages/EditarInsumoPagina.jsx';
import HistorialVentasAdminPagina from '../pages/HistorialVentasAdminPagina.jsx';

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
      {/* --- RUTAS PÚBLICAS --- */}
      <Route path='/login' element={<InicioSesion />}/>
      <Route path='/crear-cuenta' element={<CrearCuenta />}/> 
      <Route path='/sign-up' element={<CrearCuenta />}/>
      
      <Route path="/" element={<PaginaPrincipal />}/>
      <Route path="/detalle/:id" element={<PaginaDetalle />}/>
      <Route path="/quienes-somos" element={<QuienesSomos />}/>
      <Route path="/como-comprar" element={<ComoComprar />}/>

      {/* --- RUTAS COMPARTIDAS (ADMIN Y RECICLADORA) --- */}
      <Route element={<RutaProtegida rolesPermitidos={['RECICLADORA', 'ADMIN']} />}>
        <Route path="/chat-empresa/:ordenId" element={<PaginaChatEmpresa />}/>
        <Route path='/pago-exitoso/:id' element={<PagoExitoso />}/>
      </Route>

      {/* --- RUTAS SOLO DE RECICLADORA (Cliente) --- */}
      <Route element={<RutaProtegida rolesPermitidos={['RECICLADORA']} />}>
        <Route path="/carrito" element={<PaginaCarrito />}/>
        <Route path="/chat-empresa" element={<PaginaChatEmpresa />}/>
        <Route path="/historial-certificados" element={<HistorialCertificadosPagina />}/>
        <Route path="/certificado/:id" element={<PaginaCertificado />}/>
        <Route path='/descargar-certificado/:id' element={<PaginaDescarga />}/>
        <Route path='/seguimiento/:id' element={<SeguimientoRecicladoraPagina />}/>
        <Route path='/perfil' element={<DatosUsuarioPagina />}/>
      </Route>

      {/* RUTAS COMPARTIDAS (Admin y Empresa) */}
      <Route element={<RutaProtegida rolesPermitidos={['admin', 'empresa', 'usuario']} />}>
        <Route path='/pago-exitoso/:id' element={<PagoExitoso />}/>
        <Route path='/seguimiento/:id' element={<SeguimientoRecicladoraPagina />}/>
      </Route>

      {/* --- RUTAS SOLO DE ADMIN (GreenCycle) --- */}
      <Route element={<RutaProtegida rolesPermitidos={['ADMIN']} />}>
        <Route path='/inventario' element={<Inventario />}/>
        <Route path='/publicar-insumo' element={<PublicarInsumo />}/>
        <Route path='/chat-admin' element={<ChatPagina />}/>
        <Route path='/seguimiento-admin/:id' element={<SeguimientoAdminPagina />}/>
        <Route path='/editar-insumo/:id' element={<EditarInsumo />}/>
        
        {/* Esto se tiene que editar respecto al rol, uno sería filtrado */}
        <Route path='/historial-ventas' element={<HistorialVentasAdminPagina />}/>
        <Route path='/seguimiento-admin/:id' element={<SeguimientoAdminPagina />}/>
      </Route>

      {/* --- CATCH-ALL (Error 404) --- */}
      <Route path='*' element={<Navigate to="/" replace />}/>

    </Routes>
  );
}

export default AppRoutes;