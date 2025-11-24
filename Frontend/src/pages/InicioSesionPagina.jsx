import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';
import LoginEcoSwap from '../assets/login_ecoswap.png';

function InicioSesion() {
  const navigate = useNavigate();
  const { login } = useUsuario();
  
  // Estados para guardar datos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para control de errores
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  
  // Estilos
  const styleInputSesion = {
    maxWidth: "25rem",
  };

  const styleCardSesion = {
    maxWidth: "25rem",
    backgroundColor: "#D9D9D9",
  };

  const styleImageLogin = {
    maxWidth: "20rem",
    borderRadius: "5%",
    padding: "10px 20px",
  }

  // Función que maneja envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reiniciar errores
    setErrorEmail(false);
    setErrorPassword(false);

    let esValido = true;

    if (email.trim() === '') {setErrorEmail(true); esValido = false;} 

    if (password.trim() === ''){setErrorPassword(true); esValido = false;}

    if (esValido){
      console.log("Credenciales válidas. Iniciando sesión...");

      let usuarioSimulado;

      // Si el correo incluye "admin"...
      if (email.toLowerCase().includes('admin')) {
        usuarioSimulado = {
          nombre: "Administrador Principal",
          rol: "admin",
          email: email
        };
      } else {
        // Si no, es una empresa normal
        usuarioSimulado = {
          nombre: "Empresa Demo S.A.C",
          ruc: "20601234567",
          direccion: "Av. Javier Prado Este 1234, Lima",
          telefono: "987654321",
          email: email,
          rol: "empresa"
        };
      }

      login(usuarioSimulado);
      if (usuarioSimulado.rol === 'admin') {
        navigate('/inventario'); // El admin suele ir directo al inventario o dashboard
      } else {
        navigate('/'); // La empresa va al inicio
      }
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

          {/* Formulario para inicio de sesión */}
          <div className="col-12 col-md-6 justify-content-start px-3">
            <div className="card" style={styleCardSesion}>
              <div className="card-body">
                <h4 className="text-center mb-3">Iniciar sesión</h4>
                <form onSubmit={handleSubmit}>
                  
                  {/* Email */}
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
                  <div className="mb-3">
                    <label
                      className="form-label text-black"
                      htmlFor="linkCrearCuenta"
                    >
                      ¿No tiene cuenta?
                      <Link to='/sign-up' className='text-black ms-2'>
                        Crear una
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

export default InicioSesion;
