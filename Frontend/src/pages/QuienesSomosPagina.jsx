import Header from "../components/Header";
import Footer from "../components/Footer";
import LogoEcoSwap from "../assets/login_ecoswap.png";

function QuienesSomos() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1 text-black">
          <div className="row">
            <div className="col-8" style={{textAlign:"justify"}}>
              <h1 style={{color: "#198754"}}>¿Quiénes somos?</h1>
              <p>
                EcoSwap nace de una visión simple pero poderosa:{" "}
                <b>convertir el residuo en recurso</b>.
              </p>
              <p>
                En un mundo que necesita soluciones sostenibles, EcoSwap es la
                conexión vital entre las empresas que generan materiales
                potencialmente reutilizables o reciclables y las empresas que
                los necesitan como materia prima. Dejamos de ver los
                subproductos y desechos como simple "basura" y empezamos a
                verlos como insumos valiosos que merecen una segunda vida. Al
                facilitar esta transacción, logramos tres objetivos
                fundamentales:
              </p>
              <ul className="list-unstyled">
                <li>
                  <b>Reducir la Huella Ambiental:</b> Minimizamos la cantidad de
                  residuos que terminan en vertederos.
                </li>
                <li>
                  <b>Impulsar la Rentabilidad Sostenible:</b> Ofrecemos a las empresas
                  recicladoras acceso a materiales a precios competitivos.
                </li>
                <li>
                  <b>Fomentar la Economía Circular:</b> Creamos una cadena de valor
                  donde los materiales fluyen, en lugar de ser desechados.
                </li>
              </ul>

              <h3 style={{color: "#198754"}}>¿Cómo lo logramos?</h3>
              <p>
                EcoSwap no es solo un marketplace; somos una herramienta de
                gestión ambiental y de negocios. Para los Generadores
                (Vendedores): Ofrecemos una forma transparente y eficiente de
                monetizar los residuos y subproductos que antes generaban costos
                de disposición. Para los Recicladores (Compradores): Brindamos
                una plataforma centralizada para encontrar y adquirir de manera
                confiable la materia prima secundaria que impulsa sus procesos
                productivos.
              </p>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <img src={LogoEcoSwap} alt="Logo EcoSwap" style={{height:"25rem"}} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default QuienesSomos;
