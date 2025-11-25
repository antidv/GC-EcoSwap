import PublicacionInsumo from "../components/PublicacionInsumo.jsx";
import BarraBusqueda from "../components/BarraBusqueda.jsx";
import { useState } from "react";
import { MOCK_PUBLICACIONES } from "/src/data/mockData.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function PaginaPrincipal() {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("Todos");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", terminoBusqueda, "con filtro:", filtroActivo);
  };

  // Búsqueda de publicaciones
  const publicacionesFiltradas = MOCK_PUBLICACIONES.filter((pub) => {
    
    // Normalizar a minúsculas
    const textoBusqueda = terminoBusqueda.toLowerCase();
    const tituloPublicacion = pub.nombre.toLowerCase();

    // Coincidencia de texto
    const coincideTexto = tituloPublicacion.includes(textoBusqueda);

    // Coincidencia de categoría
    const coincideCategoria = filtroActivo === "Todos" || pub.categoria === filtroActivo;

    // Retornar si cumple con las condiciones
    return coincideTexto && coincideCategoria;
  });

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        {/* Pagina Principal */}
        <div className="container my-5 flex-grow-1">
          
          {/* Fila para título de bienvenida */}
          <h2 className="text-center text-black">Bievenido a EcoSwap</h2>

          {/* Espacio para Barra de Búsqueda */}
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

          {/* Espacio para Publicaciones */}
          <div className="row mt-3 px-3">
            {publicacionesFiltradas.length > 0 ? (
              publicacionesFiltradas.map((pub) => (
              <div key={pub.id} className="col-12 col-md-4 col-lg-3 d-flex justify-content-center">
                <PublicacionInsumo 
                  publicacion={pub}
                />
              </div>
              ))
            ): (
              <div className="col-12 text-center mt-5">
                <h4>No se encontraron resultados para "{terminoBusqueda}</h4>
              </div>
            )}
          </div>
        </div>

        {/* Pie de página */}
        <Footer />
      </div>
    </>
  );
}

export default PaginaPrincipal;
