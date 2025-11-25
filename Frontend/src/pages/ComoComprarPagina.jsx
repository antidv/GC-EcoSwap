import Header from "../components/Header";
import Footer from "../components/Footer";

function ComoComprar() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1 text-black">
          {/* SECCIÓN 1: VENDER (Para PyMEs) */}
          <section className="mb-5">
            <h3 className="mb-3" style={{ color: "#198754" }}>
              <i className="bi bi-shop"></i> 1. Para Vender Insumos (PyMEs
              Generadoras)
            </h3>
            <p>
              Si tu empresa genera residuos aprovechables, nosotros te los
              compramos directamente para gestionarlos.
            </p>

            <div className="table-responsive">
              <table className="table table-bordered table-hover shadow-sm colorVerdeOscuro">
                <thead style={{ backgroundColor: "#198754", color: "white" }}>
                  <tr>
                    <th scope="col" style={{ width: "5%" }}>
                      Paso
                    </th>
                    <th scope="col" style={{ width: "17%" }}>
                      Acción
                    </th>
                    <th scope="col">Descripción del Proceso</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold text-center">1</td>
                    <td>Contacto con Administrador</td>
                    <td>
                      La PyME se pone en contacto con nosotros detallando los
                      insumos que desea vender.
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-center">2</td>
                    <td>Evaluación y Venta</td>
                    <td>
                      El administrador evalúa los materiales. Si son aptos,{" "}
                      <strong>EcoSwap compra los insumos</strong> a la PyME y
                      realiza el pago.
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-center">3</td>
                    <td>Publicación en Plataforma</td>
                    <td>
                      Una vez adquiridos, EcoSwap clasifica y publica los
                      materiales en la web para que estén disponibles para las
                      empresas recicladoras.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          {/* SECCIÓN 2: COMPRAR (Para Recicladores) */}
          <section>
            <h3 className="mb-3 text-primary">
              <i className="bi bi-cart-check"></i> 2. Para Comprar Materiales
              (Empresas Recicladoras)
            </h3>
            <p>
              Adquiere insumos verificados para tu proceso de reciclaje
              siguiendo este flujo de seguridad.
            </p>

            <div className="table-responsive">
              <table className="table table-striped table-bordered shadow-sm colorVerdeOscuro">
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col" style={{ width: "10%" }}>
                      Fase
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Acción
                    </th>
                    <th scope="col">Procedimiento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold text-center">Selección</td>
                    <td>Carrito de Compras</td>
                    <td>
                      La empresa recicladora explora el catálogo, selecciona los
                      productos deseados y los agrega al{" "}
                      <strong>Carrito de Compras</strong>.
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-center">Coordinación</td>
                    <td>Chat con Administrador</td>
                    <td>
                      Al finalizar el pedido, se abre un{" "}
                      <strong>chat directo</strong> con el administrador para
                      coordinar detalles logísticos y resolver dudas.
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-center">Transacción</td>
                    <td>Pago Bancario</td>
                    <td>
                      La empresa realiza la transferencia o depósito a la cuenta
                      de <strong>EcoSwap S.A.C.</strong> y envía el comprobante
                      por el chat.
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-center">Validación</td>
                    <td>Recepción de Código</td>
                    <td>
                      Una vez confirmado el pago, el administrador envía un{" "}
                      <strong>Código de Transacción</strong> único al comprador.
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-center">Entrega</td>
                    <td>Presentación del Código</td>
                    <td>
                      Cuando llega a la sede de la empresa, el
                      encargado debe <strong>presentar el código</strong> al
                      transportista para validar y recibir la mercadería.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default ComoComprar;
