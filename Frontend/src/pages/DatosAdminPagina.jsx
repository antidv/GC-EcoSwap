import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

function DatosAdminPagina() {
  const { cargarPerfil, cambiarEmail, cambiarPassword, logout } = useUsuario();
  const navigate = useNavigate();

  const [currentEmail, setCurrentEmail] = useState("");

  const [readOnlyData, setReadOnlyData] = useState({
    nombreEmpresa: "",
    ruc: "",
    direccion: "",
    telefono: ""
  });

  const [newEmail, setNewEmail] = useState("");
  const [passForEmailChange, setPassForEmailChange] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [passForPassChange, setPassForPassChange] = useState("");

  const [errorsEmail, setErrorsEmail] = useState({});
  const [errorsPass, setErrorsPass] = useState({});

  const styleInputSesion = { maxWidth: "30rem" };

  useEffect(() => {
    const inicializarDatos = async () => {
      const respuesta = await cargarPerfil();

      if (respuesta?.success) {
        const d = respuesta.data;
        
        setCurrentEmail(d.email || "");
        
        setReadOnlyData({
            nombreEmpresa: d.nombreEmpresa || "No registrado",
            ruc: d.ruc || "No registrado",
            direccion: d.direccion || "No registrada",
            telefono: d.telefono || "No registrado"
        });
      }
    };
    inicializarDatos();
  }, []); 

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setErrorsEmail({});

    const newErrors = {};
    if (!newEmail.trim()) newErrors.email = true;
    if (!passForEmailChange.trim()) newErrors.pass = true;

    if (Object.keys(newErrors).length > 0) {
      setErrorsEmail(newErrors);
      return;
    }

    const resultado = await cambiarEmail(passForEmailChange, newEmail);
    
    if (resultado.success) {
      alert("¡Correo actualizado correctamente! Su sesión ha expirado. Inicie sesión con su nuevo correo.");
      
      logout();
      navigate("/login");
    } else {
      alert("Error al cambiar correo: " + resultado.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorsPass({});

    const newErrors = {};
    if (!newPassword.trim()) newErrors.newPass = true;
    if (!passForPassChange.trim()) newErrors.currentPass = true;

    if (Object.keys(newErrors).length > 0) {
      setErrorsPass(newErrors);
      return;
    }

    const resultado = await cambiarPassword(passForPassChange, newPassword);
    if (resultado.success) {
      alert("¡Contraseña actualizada correctamente!");
      setNewPassword("");
      setPassForPassChange("");
    } else {
      alert("Error al cambiar contraseña: " + resultado.message);
    }
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100 stylePantalla">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          <div className="row">
            <h2 className="text-black text-center">Perfil de Administrador</h2>
            <p className="text-center text-muted">
              Usuario actual: <strong>{currentEmail}</strong>
            </p>
          </div>

          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-center">
              <div
                className="card colorVerdeOscuro shadow"
                style={{ width: "fit-content", maxWidth: "40rem" }}
              >
                <div className="card-body m-3">
                  
                  {/* 1: INFORMACIÓN DE LA ORGANIZACIÓN */}
                  <div className="mb-4">
                    <h5 className="text-black mb-3">
                        1. Información de la Organización
                    </h5>
                    
                    <div className="bg-light p-3 rounded border border-secondary-subtle">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label text-muted small fw-bold mb-0">Razón Social</label>
                                <p className="text-dark fw-semibold mb-0">{readOnlyData.nombreEmpresa}</p>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-muted small fw-bold mb-0">RUC</label>
                                <p className="text-dark fw-semibold mb-0">{readOnlyData.ruc}</p>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-muted small fw-bold mb-0">Dirección Fiscal</label>
                                <p className="text-dark mb-0">{readOnlyData.direccion}</p>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label text-muted small fw-bold mb-0">Teléfono Corporativo</label>
                                <p className="text-dark mb-0">{readOnlyData.telefono}</p>
                            </div>
                        </div>
                    </div>
                  </div>

                  <hr className="text-black border-2 opacity-50 my-4" />

                  {/* 2: CAMBIAR CORREO */}
                  <form onSubmit={handleUpdateEmail}>
                    <h5 className="text-black">
                        2. Actualizar Correo
                    </h5>
                    
                    <div className="mb-3">
                        <label htmlFor="inputNewEmail" className="form-label text-black">
                            <b>Nuevo Correo</b>
                        </label>
                        <input
                            type="email"
                            className={`form-control border ${
                                errorsEmail.email ? "border-danger" : "border-black"
                            }`}
                            id="inputNewEmail"
                            style={styleInputSesion}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="nuevo@admin.com"
                        />
                        {errorsEmail.email && (
                            <small className="text-danger">* Ingrese nuevo correo</small>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassEmail" className="form-label text-black">
                            <b>Contraseña Actual</b>
                        </label>
                        <input
                            type="password"
                            className={`form-control border ${
                                errorsEmail.pass ? "border-danger" : "border-black"
                            }`}
                            id="inputPassEmail"
                            style={styleInputSesion}
                            value={passForEmailChange}
                            onChange={(e) => setPassForEmailChange(e.target.value)}
                            placeholder="********"
                        />
                        {errorsEmail.pass && (
                            <small className="text-danger">* Requerido para confirmar</small>
                        )}
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-warning fw-bold">
                        Actualizar correo
                      </button>
                    </div>
                  </form>

                  <hr className="text-black border-2 opacity-50 my-4" />

                  {/* 3: CAMBIAR CONTRASEÑA */}
                  <form onSubmit={handleUpdatePassword}>
                    <h5 className="text-black">
                        3. Cambiar Contraseña
                    </h5>
                    
                    <div className="mb-3">
                        <label htmlFor="inputNewPass" className="form-label text-black">
                            <b>Nueva Contraseña</b>
                        </label>
                        <input
                            type="password"
                            className={`form-control border ${
                                errorsPass.newPass ? "border-danger" : "border-black"
                            }`}
                            id="inputNewPass"
                            style={styleInputSesion}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="********"
                        />
                        {errorsPass.newPass && (
                            <small className="text-danger">* Ingrese nueva contraseña</small>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassConf" className="form-label text-black">
                            <b>Contraseña Actual</b>
                        </label>
                        <input
                            type="password"
                            className={`form-control border ${
                                errorsPass.currentPass ? "border-danger" : "border-black"
                            }`}
                            id="inputPassConf"
                            style={styleInputSesion}
                            value={passForPassChange}
                            onChange={(e) => setPassForPassChange(e.target.value)}
                            placeholder="********"
                        />
                        {errorsPass.currentPass && (
                            <small className="text-danger">* Requerido para confirmar</small>
                        )}
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-warning fw-bold">
                        Actualizar contraseña
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default DatosAdminPagina;