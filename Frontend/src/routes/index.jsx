import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext.jsx';

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
import CertificadoDocumento from '../pages/CertificadoPDF.jsx';

{/* Del admin */}
import Inventario from '../pages/InventarioPagina.jsx';
import PublicarInsumo from '../pages/PublicarInsumoPagina.jsx';
import ChatPagina from '../pages/ChatPagina.jsx';
import PagoExitoso from '../pages/PagoExistosoPagina.jsx';
// import HistorialTransacciones from '../pages/HistorialTransaccionesPagina.jsx';

const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario } = useUsuario();

  if (!usuario) {
    return <Navigate to="/" replace />
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function AppRoutes() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path='/login' element={<InicioSesion />}/>
      <Route path='/sign-up' element={<CrearCuenta />}/>
      <Route path="/" element={<PaginaPrincipal />}/>
      <Route path="/detalle/:id" element={<PaginaDetalle />}/>
      <Route path="/quienes-somos" element={<QuienesSomos />}/>
      <Route path="/como-comprar" element={<ComoComprar />}/>

      {/* Una ruta "catch-all" por si el usuario pone una URL no válida */}
      {/* Falta arreglar esto, siempre manda a Pagina Principal xd, debe ser por rol */}
      
      {/* RUTAS EMPRESA */}
      <Route element={<RutaProtegida rolesPermitidos={['empresa', 'usuario']} />}>
        <Route path="/carrito" element={<PaginaCarrito />}/>
        <Route path="/chat-empresa" element={<PaginaChatEmpresa />}/>
        <Route path="/historial-certificados" element={<HistorialCertificadosPagina />}/>
        <Route path="/certificado/:id" element={<PaginaCertificado />}/>
        <Route path='/descargar-certificado/:id' element={<PaginaDescarga />}/>
      </Route>

      {/* RUTAS COMPARTIDAS (Admin y Empresa) */}
      <Route element={<RutaProtegida rolesPermitidos={['admin', 'empresa', 'usuario']} />}>
        <Route path='/pago-exitoso/:id' element={<PagoExitoso />}/>
      </Route>

      {/* Admin */}
      <Route element={<RutaProtegida rolesPermitidos={['admin']} />}>
        <Route path='/inventario' element={<Inventario />}/>
        <Route path='/publicar-insumo' element={<PublicarInsumo />}/>
        <Route path='/chat-admin' element={<ChatPagina />}/>
        <Route path='/seguimiento/:id' element={<SeguimientoAdminPagina />}/>
        
        {/* Esto se tiene que editar respecto al rol, uno sería filtrado */}
        <Route path='/historial-transacciones' element={<HistorialCertificadosPagina />}/>
      </Route>

      {/* <Route path="*" element={<PaginaPrincipal />}/> */}

      {/* CATCH-ALL (Ruta 404) */}
      <Route path='*' element={<Navigate to="/" replace />}/>

    </Routes>
  );
}

export default AppRoutes;