import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';
import LoginEcoSwap from '../assets/login_ecoswap.png';

function CrearCuenta() {
  const navigate = useNavigate();
  const { login } = useUsuario();
  
  // Estados para guardar datos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [ruc, setRuc] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Estados para control de errores
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorRuc, setErrorRuc] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const styleInputSesion = {
    maxWidth: "30rem",
  };

  const styleCardSesion = {
    maxWidth: "30rem",
    backgroundColor: "#D9D9D9",
  };

  const styleImageLogin = {
    maxWidth: "20rem",
    backgroundColor: "white",
    borderRadius: "5%",
    padding: "10px 20px",
  }

  // Función que maneja envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reiniciar errores
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorName(false);
    setErrorRuc(false);
    setErrorAddress(false);
    setErrorPhone(false);

    let esValido = true;

    if (email.trim() === '') { setErrorEmail(true); esValido = false;} 
    if (password.trim() === ''){ setErrorPassword(true); esValido = false;}
    if (name.trim() === ''){ setErrorName(true); esValido = false;}
    if (ruc.trim() === '' || ruc.length !== 11){ setErrorRuc(true); esValido = false;}
    if (address.trim() === ''){ setErrorAddress(true); esValido = false;}
    if (phone.trim() === '' || phone.length !== 9){ setErrorPhone(true); esValido = false;}
    
    if (esValido){
      console.log("Formulario enviado correctamente")
      console.log("Creando cuenta para: ", name)

      login({
        nombre: name,
        ruc: ruc,
        direccion: address,
        telefono: phone,
        email: email
      })

      navigate('/');
    }
  }

  return (
    <>
      <div className="container-fluid min-vh-100 stylePantalla">
        <div className="row min-vh-100 d-flex align-items-center justify-content-center">
          {/* Espacio para Título y subtítulo */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mb-5 mb-md-0 text-center px-3">
            <img src={LoginEcoSwap} alt="Login EcoSwap" style={styleImageLogin}/>
          </div>

          {/* Formulario para crear cuenta */}
          <div className="col-12 col-md-6 justify-content-start">
            <div className="card" style={styleCardSesion}>
              <div className="card-body">
                <h4 className="text-center mb-3">Crear cuenta</h4>
                <form onSubmit={handleSubmit}>
                  
                  {/* Correo electrónico */}
                  <div className="mb-3">
                    <label
                      htmlFor="inputEmail"
                      className="form-label text-black"
                    >
                      <b>Correo electrónico</b>
                    </label>
                    <input
                      type="email"
                      className={`form-control border ${errorEmail ? 'border-danger' : 'border-black'}`}
                      id="inputEmail"
                      style={styleInputSesion}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                    />
                    {errorEmail && (
                      <small className='text-danger'>
                        * Debe ingresar un correo electrónico
                      </small>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label
                      htmlFor="inputPassword"
                      className="form-label text-black"
                    >
                      <b>Contraseña</b>
                    </label>
                    <input
                      type="password"
                      className={`form-control border ${errorPassword ? 'border-danger' : 'border-black'}`}
                      id="inputPassword"
                      style={styleInputSesion}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                    />
                    {errorPassword && (
                      <small className='text-danger'>
                        * Debe ingresar una contraseña
                      </small>
                    )}
                  </div>
                  <h6 className="text-center mb-3">Datos generales</h6>
                  <div className="row">
                    
                    {/* Nombre de empresa */}
                    <div className="col-6 mb-3">
                      <label
                        htmlFor="inputName"
                        className="form-label text-black"
                      >
                        <b>Nombre</b>
                      </label>
                      <input
                        type="text"
                        className={`form-control border ${errorName ? 'border-danger' : 'border-black'}`}
                        id="inputName"
                        style={styleInputSesion}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Juan Peréz'
                      />
                      {errorName && (
                      <small className='text-danger'>
                        * Debe ingresar un nombre
                      </small>
                      )}
                    </div>

                    {/* R.U.C */}
                    <div className="col-6 mb-3">
                      <label
                        htmlFor="inputRuc"
                        className="form-label text-black"
                      >
                        <b>R.U.C</b>
                      </label>
                      <input
                        type="text"
                        className={`form-control border ${errorRuc ? 'border-danger' : 'border-black'}`}
                        id="inputRuc"
                        style={styleInputSesion}
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                        placeholder='12345678901'
                      />
                      {errorRuc && (
                      <small className='text-danger'>
                        * Debe ingresar un número RUC
                      </small>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    
                    {/* Dirección */}
                    <div className="col-6 mb-3">
                      <label
                        htmlFor="inputAddress"
                        className="form-label text-black"
                      >
                        <b>Dirección</b>
                      </label>
                      <input
                        type="text"
                        className={`form-control border ${errorAddress ? 'border-danger' : 'border-black'}`}
                        id="inputAddress"
                        aria-describedby="emailHelp"
                        style={styleInputSesion}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Calle Falsa 123'
                      />
                      {errorAddress && (
                      <small className='text-danger'>
                        * Debe ingresar una dirección
                      </small>
                      )}
                    </div>
                    
                    {/* Teléfono */}
                    <div className="col-6 mb-3">
                      <label
                        htmlFor="inputPhone"
                        className="form-label text-black"
                      >
                        <b>Teléfono</b>
                      </label>
                      <input
                        type="text"
                        className={`form-control border ${errorPhone ? 'border-danger' : 'border-black'}`}
                        id="inputPhone"
                        style={styleInputSesion}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='912345678'
                      />
                      {errorPhone && (
                      <small className='text-danger'>
                        * Debe ingresar un teléfono
                      </small>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label text-black"
                      htmlFor="exampleCheck1"
                    >
                      ¿Tiene cuenta?
                      <Link to='/login' className='text-black ms-2'>
                        Inicie sesión
                      </Link>
                    </label>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrearCuenta;
