import React, { useState } from "react";
import PublicacionInsumo from "../components/PublicacionInsumo.jsx";
import BarraBusqueda from "../components/BarraBusqueda.jsx";
import { useInventario } from "../context/InventarioContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function PaginaPrincipal() {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  
  const { listaPublicaciones, loading } = useInventario();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", terminoBusqueda, "con filtro:", filtroActivo);
  };

  const publicacionesFiltradas = listaPublicaciones.filter((pub) => {
    if (!pub) return false;

    const textoBusqueda = terminoBusqueda.toLowerCase();
    const tituloPublicacion = pub.nombre ? pub.nombre.toLowerCase() : "";

    const coincideTexto = tituloPublicacion.includes(textoBusqueda);

    const coincideCategoria = filtroActivo === "Todos" || pub.categoria === filtroActivo;

    return coincideTexto && coincideCategoria;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="container my-5 flex-grow-1">
        
        <h2 className="text-center text-black mb-4">Bienvenido a EcoSwap</h2>

        <div className="row justify-content-center my-4">
          <div className="col-12 col-md-10 col-lg-8">
            <BarraBusqueda
              terminoBusqueda={terminoBusqueda}
              onTerminoBusquedaChange={setTerminoBusqueda}
              filtroActivo={filtroActivo}
              onFiltroActivoChange={setFiltroActivo}
              onSearchSubmit={handleSearch}
            />
          </div>
        </div>

        <div className="row mt-3 px-3">
          
          {loading && (
            <div className="col-12 text-center mt-5">
              <div className="spinner-border text-success" role="status"></div>
              <p className="text-muted mt-2">Cargando catálogo...</p>
            </div>
          )}

          {!loading && publicacionesFiltradas.length > 0 && (
            publicacionesFiltradas.map((pub) => (
              <div key={pub.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 d-flex justify-content-center">
                <PublicacionInsumo publicacion={pub} />
              </div>
            ))
          )}

          {!loading && publicacionesFiltradas.length === 0 && (
            <div className="col-12 text-center mt-5">
              <h4 className="text-muted">No se encontraron productos disponibles.</h4>
              {terminoBusqueda && <p>Para la búsqueda: "{terminoBusqueda}"</p>}
            </div>
          )}
          
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PaginaPrincipal;