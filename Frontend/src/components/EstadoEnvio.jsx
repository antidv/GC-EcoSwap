
function EstadoEnvio({imagen, nombre, descripcion, isSelected}){

     const styleCardEstado = {
          backgroundColor: isSelected ? "#198754" : "#ffffff",
          color: isSelected ?  "#ffffff": "#000000",
          width: "19rem",
          transition: "all 0.3s ease"
     }

     return (
          <>
               <div className="col-4 d-flex justify-content-center">
                    <div className="card my-4 border-2 colorVerdeOscuro" style={styleCardEstado}>
                         <div className="card-body">
                              <img src={imagen} alt="Estado" className="d-block mx-auto mb-3" style={{width: "12rem"}}/>
                              <h5 className="card-title">
                                   {nombre}
                              </h5>
                              <p className="card-text">
                                   {descripcion}
                              </p>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default EstadoEnvio;