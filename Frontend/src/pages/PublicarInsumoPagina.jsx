import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import Header from '../components/Header.jsx';
import api from '../services/api';

function PublicarInsumo() {
  const navigate = useNavigate();
  const { agregarPublicacion } = useInventario(); 

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagenUrl, setImagenUrl] = useState("https://cdn-icons-png.flaticon.com/512/2666/2666668.png");
  
  const [listaCategorias, setListaCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
        try {
            const response = await api.get('/insumos/categorias');
            setListaCategorias(response.data);
        } catch (error) {
            console.error("Error cargando categorías:", error);
            setListaCategorias(["PLASTICO", "CARTON", "PAPEL", "VIDRIO", "METAL"]); 
        }
    };
    obtenerCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Publicando insumo...");

    const nuevaData = {
      nombre: nombre,
      categoria: categoria,
      descripcion: descripcion,
      precioPorKg: parseFloat(precio), 
      cantidadKg: parseFloat(cantidad),
      imagenUrl: imagenUrl
    };

    const resultado = await agregarPublicacion(nuevaData);

    if (resultado.success) {
      alert("Publicación creada exitosamente (Estado: PRIVADO)");
      navigate('/inventario'); 
    } else {
      alert("Error: " + resultado.message);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      <div className="row justify-content-center mt-4 mb-5">
        <div className="col-12 col-md-10 col-lg-8">
          
          <h4 className="text-white mb-3">Publicar nuevo insumo</h4>
          
          <div className="card shadow" style={{borderRadius: '8px'}}>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Nombre</label>
                    <input 
                      type="text" className="form-control" 
                      placeholder="Ej: Cajas de cartón" 
                      value={nombre} onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Categoría</label>
                    <select 
                      className="form-select"
                      value={categoria} onChange={(e) => setCategoria(e.target.value)}
                      required
                    >
                        <option value="">Seleccionar...</option>
                        {listaCategorias.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Cantidad (Kg)</label>
                    <input 
                      type="number" className="form-control" 
                      placeholder="Ej: 100" 
                      value={cantidad} onChange={(e) => setCantidad(e.target.value)}
                      min="1" step="0.01" required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Precio por Kg (S/)</label>
                    <input 
                      type="number" className="form-control" 
                      placeholder="Ej: 0.50" 
                      value={precio} onChange={(e) => setPrecio(e.target.value)}
                      min="0" step="0.01" required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-bold">Descripción</label>
                    <textarea 
                      className="form-control" 
                      placeholder="Detalles del estado del material..." 
                      value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                      style={{ height: "80px", resize: "none" }}
                    ></textarea>
                  </div>
                  
                  <div className="col-md-12">
                    <label className="form-label fw-bold">URL de Imagen (Opcional)</label>
                    <input 
                      type="text" className="form-control" 
                      placeholder="https://ejemplo.com/foto.jpg" 
                      value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)}
                    />
                    <small className="text-muted">Por defecto se usará una imagen genérica.</small>
                  </div>
                </div>

                <div className="alert alert-info py-2 small">
                  <i className="bi bi-info-circle me-2"></i>
                  La publicación se creará en estado <b>PRIVADO</b>. Podrás activarla desde el inventario.
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <button 
                        type="submit" 
                        className="btn btn-success w-100 fw-bold"
                        style={{backgroundColor: '#198754', borderColor: '#198754'}}
                        >
                        Guardar Publicación
                        </button>
                    </div>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PublicarInsumo;