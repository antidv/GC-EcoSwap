import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

function DatosUsuarioPagina() {
  const navigate = useNavigate();
  const { cargarPerfil, actualizarPerfil } = useUsuario();

  // Estados de Datos Generales
  const [currentEmail, setCurrentEmail] = useState("");
  const [name, setName] = useState("");
  const [ruc, setRuc] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Estados para Cambiar Correo
  const [newEmail, setNewEmail] = useState("");
  const [passforEmailChange, setPassForEmailChange] = useState("");

  // Estados para Cambiar Contraseña
  const [newPassword, setNewPassword] = useState("");
  const [passForPassChange, setPassForPassChange] = useState("");

  // Errores de datos generales
  const [errorsDatos, setErrorsDatos] = useState({});
  const [errorsEmail, setErrorsEmail] = useState({});
  const [errorsPass, setErrorsPass] = useState({});

  const styleInputSesion = { maxWidth: "30rem" };

  useEffect(() => {
    const inicializarDatos = async () => {
      const respuesta = await cargarPerfil();

      if (respuesta?.success) {
        const d = respuesta.data;

        setCurrentEmail(d.email || "");
        setName(d.nombreEmpresa || "");
        setRuc(d.ruc || "");
        setAddress(d.direccion || "");
        setPhone(d.telefono || "");
      }
    };
    inicializarDatos();
  }, []);

  const handleUpdateDatos = async (e) => {
    e.preventDefault();
    setErrorsDatos({});

    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (!ruc.trim() || ruc.length != 11) newErrors.ruc = true;
    if (!address.trim()) newErrors.address = true;
    if (!phone.trim() || phone.length < 7) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrorsDatos(newErrors);
      return;
    }

    const datos = {
      nombreEmpresa: name,
      ruc,
      direccion: address,
      telefono: phone,
    };

    const resultado = await actualizarPerfil(datos);
    if (resultado.success) {
      alert("!Datos generales actualizados!");
      navigate("/")
    } else {
      alert("Error: " + resultado.message);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setErrorsEmail({});

    const newErrors = {};
    if (!newEmail.trim()) newErrors.email = true;
    if (!passforEmailChange.trim()) newErrors.pass = true;

    if (Object.keys(newErrors).length > 0) {
      setErrorsEmail(newErrors);
      return;
    }

    const datos = {
      email: newEmail,
      passwordConfirmation: passforEmailChange,
    };

    const resultado = await actualizarPerfil(datos);
    if (resultado.success) {
      alert("¡Correo actualizado correctamente!");
      setCurrentEmail(newEmail);
      setNewEmail("");
      setPassForEmailChange("");
      navigate("/")
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

    const datos = {
      password: newPassword,
      passwordConfirmation: passForPassChange,
    };

    const resultado = await actualizarPerfil(datos);
    if (resultado.success) {
      alert("¡Contraseña actualizada correctamente!");
      setNewPassword("");
      setPassForPassChange("");
      navigate("/")
    } else {
      alert("Error al cambiar contraseña: " + resultado.message);
    }
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          <div className="row">
            <h2 className="text-black text-center">Configuración de Cuenta</h2>
            <p className="text-center text-muted">
              Usuario actual: <strong>{currentEmail}</strong>
            </p>
          </div>

          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-center">
              {/* CARD PRINCIPAL */}
              <div
                className="card colorVerdeOscuro shadow"
                style={{ width: "fit-content" }}
              >
                <div className="card-body m-3">
                  {/* SECCIÓN 1: DATOS GENERALES */}
                  <form onSubmit={handleUpdateDatos}>
                    <h5 className="text-black">
                      1. Datos generales
                    </h5>

                    {/* Nombre y RUC */}
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputName"
                          className="form-label text-black"
                        >
                          <b>Nombre</b>
                        </label>
                        <input
                          type="text"
                          className={`form-control border ${
                            errorsDatos.name ? "border-danger" : "border-black"
                          }`}
                          id="inputName"
                          style={styleInputSesion}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errorsDatos.name && (
                          <small className="text-danger">
                            * Ingrese nombre
                          </small>
                        )}
                      </div>

                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputRuc"
                          className="form-label text-black"
                        >
                          <b>R.U.C</b>
                        </label>
                        <input
                          type="text"
                          className={`form-control border ${
                            errorsDatos.ruc ? "border-danger" : "border-black"
                          }`}
                          id="inputRuc"
                          style={styleInputSesion}
                          value={ruc}
                          onChange={(e) => setRuc(e.target.value)}
                        />
                        {errorsDatos.ruc && (
                          <small className="text-danger">
                            * RUC de 11 dígitos
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputAddress"
                          className="form-label text-black"
                        >
                          <b>Dirección</b>
                        </label>
                        <input
                          type="text"
                          className={`form-control border ${
                            errorsDatos.address
                              ? "border-danger"
                              : "border-black"
                          }`}
                          id="inputAddress"
                          style={styleInputSesion}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Calle Falsa 123"
                        />
                        {errorsDatos.address && (
                          <small className="text-danger">
                            * Ingrese dirección
                          </small>
                        )}
                      </div>

                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputPhone"
                          className="form-label text-black"
                        >
                          <b>Teléfono</b>
                        </label>
                        <input
                          type="text"
                          className={`form-control border ${
                            errorsDatos.phone ? "border-danger" : "border-black"
                          }`}
                          id="inputPhone"
                          style={styleInputSesion}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="912345678"
                        />
                        {errorsDatos.phone && (
                          <small className="text-danger">
                            * Ingrese teléfono
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-warning fw-bold">
                        Guardar Datos Generales
                      </button>
                    </div>
                  </form>
                  
                  <hr className="text-black border-2 opacity-50" />

                  {/* SECCIÓN 2: CAMBIAR CORREO */}
                  <form onSubmit={handleUpdateEmail}>
                    <h5 className="text-black">
                      2. Cambiar Correo Electrónico
                    </h5>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputEmail"
                          className="form-label text-black"
                        >
                          <b>Nuevo Correo</b>
                        </label>
                        <input
                          type="email"
                          className={`form-control border ${
                            errorsEmail.email ? "border-danger" : "border-black"
                          }`}
                          id="inputEmail"
                          style={styleInputSesion}
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="ejemplo@correo.com"
                        />
                        {errorsEmail.email && (
                          <small className="text-danger">
                            * Ingrese nuevo correo
                          </small>
                        )}
                      </div>

                      <div className="col-6 mb-3">
                        <label className="form-label text-black">
                          <b>Contraseña actual</b>
                        </label>
                        <input
                          type="password"
                          className={`form-control border ${
                            errorsEmail.pass ? "border-danger" : "border-black"
                          }`}
                          placeholder="********"
                          value={passforEmailChange}
                          onChange={(e) =>
                            setPassForEmailChange(e.target.value)
                          }
                        />
                        {errorsEmail.pass && (
                          <small className="text-danger">
                            * Requerido para confirmar
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-warning fw-bold">
                        Actualizar correo
                      </button>
                    </div>
                  </form>
                  
                  <hr className="text-black border-2 opacity-50" />
                  
                  {/* SECCIÓN 3: CAMBIAR CONTRASEÑA */}
                  <form onSubmit={handleUpdatePassword}>
                    <h5 className="text-black">3. Cambiar Contraseña</h5>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputPassword"
                          className="form-label text-black"
                        >
                          <b>Nueva Contraseña</b>
                        </label>
                        <input
                          type="password"
                          className={`form-control border ${
                            errorsPass.newPass ? "border-danger" : "border-black"
                          }`}
                          id="inputPassword"
                          style={styleInputSesion}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="********"
                        />
                        {errorsPass.newPass && (
                          <small className="text-danger">
                            * Ingrese nueva contraseña
                          </small>
                        )}
                      </div>

                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputPassword"
                          className="form-label text-black"
                        >
                          <b>Contraseña Actual</b>
                        </label>
                        <input
                          type="password"
                          className={`form-control border ${
                            errorsPass.currentPass ? "border-danger" : "border-black"
                          }`}
                          id="inputPassword"
                          style={styleInputSesion}
                          value={newPassword}
                          onChange={(e) => setPassForPassChange(e.target.value)}
                          placeholder="********"
                        />
                        {errorsPass.currentPass && (
                          <small className="text-danger">
                            * Ingrese nueva contraseña
                          </small>
                        )}
                      </div>
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

export default DatosUsuarioPagina;
