import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

function DatosUsuarioPagina() {
  const navigate = useNavigate();
  const { usuario, editar } = useUsuario();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ruc, setRuc] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorRuc, setErrorRuc] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const styleInputSesion = { maxWidth: "30rem" };

  useEffect(() => {
     if (usuario) {
          setEmail(usuario.email || "");
          setName(usuario.nombreEmpresa || "");
          setRuc(usuario.ruc || "");
          setAddress(usuario.direccion || usuario.address || "");
          setPhone(usuario.telefono || "");
     }
  }, [usuario])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorEmail(false);
    setErrorPassword(false);
    setErrorName(false);
    setErrorRuc(false);
    setErrorAddress(false);
    setErrorPhone(false);

    let esValido = true;
    if (email.trim() === "") {
      setErrorEmail(true);
      esValido = false;
    }
    if (password.trim() === "") {
      setErrorPassword(true);
      esValido = false;
    }
    if (name.trim() === "") {
      setErrorName(true);
      esValido = false;
    }
    if (ruc.trim() === "" || ruc.length !== 11) {
      setErrorRuc(true);
      esValido = false;
    }
    if (address.trim() === "") {
      setErrorAddress(true);
      esValido = false;
    }
    if (phone.trim() === "" || phone.length < 7) {
      setErrorPhone(true);
      esValido = false;
    }

    if (esValido) {
      console.log("Enviando datos al backend...");

      const datosParaBackend = {
        nombreEmpresa: name,
        ruc: ruc,
        direccion: address,
        telefono: phone,
        email: email,
        password: password,
      };

      const resultado = await editar(datosParaBackend);

      if (resultado.success) {
        alert("¡Cuenta creada con éxito! Por favor inicie sesión.");
        navigate("/");
      } else {
        alert("Error: " + resultado.message);
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        <div className="container my-5 flex-grow-1">
          <div className="row">
            <h2 className="text-black text-center">Información de empresa</h2>
          </div>
          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-center">
              <div className="card" style={{ width: "fit-content" }}>
                <div className="card-body m-3">
                  <form onSubmit={handleSubmit}>
                    {/* Email y Password*/}
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputEmail"
                          className="form-label text-black"
                        >
                          <b>Correo electrónico</b>
                        </label>
                        <input
                          type="email"
                          className={`form-control border ${
                            errorEmail ? "border-danger" : "border-black"
                          }`}
                          id="inputEmail"
                          style={styleInputSesion}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ejemplo@correo.com"
                        />
                        {errorEmail && (
                          <small className="text-danger">
                            * Debe ingresar un correo
                          </small>
                        )}
                      </div>

                      <div className="col-6 mb-3">
                        <label
                          htmlFor="inputPassword"
                          className="form-label text-black"
                        >
                          <b>Contraseña</b>
                        </label>
                        <input
                          type="password"
                          className={`form-control border ${
                            errorPassword ? "border-danger" : "border-black"
                          }`}
                          id="inputPassword"
                          style={styleInputSesion}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="********"
                        />
                        {errorPassword && (
                          <small className="text-danger">
                            * Debe ingresar una contraseña
                          </small>
                        )}
                      </div>
                    </div>

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
                            errorName ? "border-danger" : "border-black"
                          }`}
                          id="inputName"
                          style={styleInputSesion}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Juan Pérez"
                        />
                        {errorName && (
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
                            errorRuc ? "border-danger" : "border-black"
                          }`}
                          id="inputRuc"
                          style={styleInputSesion}
                          value={usuario.ruc}
                          onChange={(e) => setRuc(e.target.value)}
                          placeholder="12345678901"
                        />
                        {errorRuc && (
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
                            errorAddress ? "border-danger" : "border-black"
                          }`}
                          id="inputAddress"
                          style={styleInputSesion}
                          value={usuario.address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Calle Falsa 123"
                        />
                        {errorAddress && (
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
                            errorPhone ? "border-danger" : "border-black"
                          }`}
                          id="inputPhone"
                          style={styleInputSesion}
                          value={usuario.telefono}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="912345678"
                        />
                        {errorPhone && (
                          <small className="text-danger">
                            * Ingrese teléfono
                          </small>
                        )}
                      </div>
                    </div>

                    {/* Botón de Editar */}
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">
                          Ingresar
                        </button>
                      </div>
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
