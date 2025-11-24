function PublicarInsumo() {
  return (
    <>
      {/* Header */}
      <Header />
      
      <div className="container-fluid min-vh-100 stylePantalla">
        {/* Espacio para Título y subtítulo */}
        <div className="row">
          <h1 className="text-center text-white mt-5">EcoSwap</h1>
          <h4 className="text-center text-white">Compra, vende, recicla</h4>
        </div>

        <div className="row mx-5">
          <h4 className="text-white mt-3">Publicar insumo</h4>
          <div className="col-12 justify-content-start">
            <div className="card">
              <div className="card-body">
                <form action="">
                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-black"
                        >
                          <b>Nombre</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label text-black"
                        >
                          <b>Categoría</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-black"
                        >
                          <b>Nombre</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label text-black"
                        >
                          <b>Categoría</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-9">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-black"
                        >
                          <b>Descripción</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-black"
                        >
                          <b>Estado</b>
                        </label>
                        <select class="form-select" aria-label="Público">
                          <option selected>Público</option>
                          <option value="publico">Público</option>
                          <option value="privado">Privado</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-black"
                        >
                          <b>Image</b>
                        </label>
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Crear publicación
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicarInsumo;
