import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import Header from '../components/Header.jsx';
import api from '../services/api';

function EditarInsumo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerPublicacionPorId, editarPublicacion } = useInventario(); 

  const [loading, setLoading] = useState(true);
  
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  
  const [listaCategorias, setListaCategorias] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
        try {
            const catResponse = await api.get('/insumos/categorias').catch(() => ({ data: ["PLASTICO", "CARTON", "PAPEL", "VIDRIO", "METAL", "ELECTRONICOS"] }));
            setListaCategorias(catResponse.data);

            const publicacionActual = await obtenerPublicacionPorId(parseInt(id));
            
            if (publicacionActual) {
                setNombre(publicacionActual.nombre);
                setCategoria(publicacionActual.categoria);
                setDescripcion(publicacionActual.descripcion || "");
                setPrecio(publicacionActual.precioPorKg);
                setCantidad(publicacionActual.cantidadKg);
                setImagenUrl(publicacionActual.imagenUrl || "");
            } else {
                alert("No se encontró la publicación");
                navigate('/inventario');
            }
        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            setLoading(false);
        }
    };
    cargarDatos();
  }, [id, navigate, obtenerPublicacionPorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataActualizada = {
      id: parseInt(id),
      nombre,
      categoria,
      descripcion,
      precioPorKg: parseFloat(precio), 
      cantidadKg: parseFloat(cantidad),
      imagenUrl
    };

    const resultado = await editarPublicacion(id, dataActualizada);

    if (resultado.success) {
      alert("Publicación actualizada exitosamente");
      navigate('/inventario'); 
    } else {
      alert("Error al actualizar: " + resultado.message);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando datos...</div>;

  return (
    <div className="d-flex flex-column min-vh-100 stylePantalla">
      <Header />
      <div className="row justify-content-center mt-4 mb-5">
        <div className="col-12 col-md-10 col-lg-8">
          
          <h4 className="text-white mb-3">Editar Insumo</h4> {/* Título cambiado */}
          
          <div className="card shadow" style={{borderRadius: '8px'}}>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* ... (Aquí va EXACTAMENTE el mismo formulario que en PublicarInsumo, inputs iguales) ... */}
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Categoría</label>
                    <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">Seleccionar...</option>
                        {listaCategorias.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Cantidad (Kg)</label>
                        <input type="number" className="form-control" value={cantidad} onChange={(e) => setCantidad(e.target.value)} min="1" step="0.01" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Precio por Kg (S/)</label>
                        <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} min="0" step="0.01" required />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                        <label className="form-label fw-bold">Descripción</label>
                        <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} style={{ height: "80px", resize: "none" }}></textarea>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label fw-bold">URL de Imagen</label>
                        <input type="text" className="form-control" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/inventario')}>Cancelar</button>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary w-100 fw-bold">Guardar Cambios</button>
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

export default EditarInsumo;