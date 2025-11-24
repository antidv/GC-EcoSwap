import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import ImagenCarton from "../assets/carton.jpg"; 
import Header from '../components/Header.jsx';

function PublicarInsumo() {
  const navigate = useNavigate();
  const { agregarPublicacion } = useInventario(); 

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Publico");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Publicando insumo...");

    const nuevaData = {
      nombre: nombre || "Nuevo Insumo",
      categoria: categoria || "Varios",
      descripcion: descripcion,
      tipo: estado,
      precio: precio ? `S/ ${precio}` : "S/ 0.00",
      cantidad: cantidad ? `${cantidad} uni.` : "0 uni.",
      imagen: ImagenCarton 
    };

    agregarPublicacion(nuevaData);

    alert("Publicación creada exitosamente");
    navigate('/inventario'); 
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="row justify-content-center mt-4 mb-5">
        <div className="col-12 col-md-10 col-lg-8">
          
          <h4 className="text-white mb-3">Publicar insumo</h4>
          
          <div className="card shadow" style={{borderRadius: '8px'}}>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                
                {/* Fila 1: Nombre y Categoría */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Nombre</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Ej: Cajas de cartón" 
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Categoría</label>
                    <select 
                      className="form-select"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="Cartón">Cartón</option>
                        <option value="Plástico">Plástico</option>
                        <option value="Papel">Papel</option>
                    </select>
                  </div>
                </div>

                {/* Fila 2: Cantidad y Precio */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Cantidad</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Ej: 100" 
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Precio (S/)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Ej: 50.00" 
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Fila 3: Descripción y Estado */}
                <div className="row mb-3">
                  <div className="col-md-8">
                    <label className="form-label fw-bold">Descripción</label>
                    <textarea 
                      className="form-control" 
                      placeholder="Detalles del insumo..." 
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      style={{ height: "120px", resize: "none" }}
                    ></textarea>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Estado</label>
                    <select 
                      className="form-select"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      <option value="Publico">Público</option>
                      <option value="Privado">Privado</option>
                    </select>

                    <div className="mt-3">
                        <label className="form-label fw-bold">Imagen</label>
                        <div className="input-group">
                        <label className="input-group-text bg-light" htmlFor="formFile">Elegir</label>
                        <input type="text" className="form-control bg-white" placeholder="No se eligió..." disabled />
                        <input type="file" className="d-none" id="formFile" />
                        </div>
                    </div>
                  </div>
                </div>

                {/* Botón Submit */}
                <div className="row mt-4">
                    <div className="col-12">
                        <button 
                        type="submit" 
                        className="btn btn-success"
                        style={{backgroundColor: '#198754', borderColor: '#198754'}}
                        >
                        Crear publicación
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