import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';
import LoginEcoSwap from '../assets/login_ecoswap.png';

function InicioSesion() {
  const navigate = useNavigate();
  const { login } = useUsuario();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  
  const styleInputSesion = { maxWidth: "25rem" };
  const styleCardSesion = { maxWidth: "25rem", backgroundColor: "#D9D9D9" };
  const styleImageLogin = { maxWidth: "20rem", borderRadius: "5%", padding: "10px 20px" };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorEmail(false);
    setErrorPassword(false);

    let esValido = true;
    if (email.trim() === '') { setErrorEmail(true); esValido = false; } 
    if (password.trim() === '') { setErrorPassword(true); esValido = false; }

    if (esValido) {
      const resultado = await login(email, password);

      if (resultado.success) {
        const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
        
        if (datosUsuario?.rol === 'ADMIN') {
           navigate('/inventario');
        } else {
           navigate('/');
        }
      } else {
        alert("Error: " + resultado.message);
      }
    }
  }

  return (
    <>
      <div className="container-fluid min-vh-100 stylePantalla">
        <div className="row min-vh-100 d-flex align-items-center justify-content-center">
          
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center mb-5 mb-md-0 text-center px-3">
            <img src={LoginEcoSwap} alt="Login EcoSwap" style={styleImageLogin}/>
          </div>

          <div className="col-12 col-md-6 justify-content-start px-3">
            <div className="card" style={styleCardSesion}>
              <div className="card-body">
                <h4 className="text-center mb-3">Iniciar sesión</h4>
                <form onSubmit={handleSubmit}>
                  
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label text-black"><b>Correo electrónico</b></label>
                    <input
                      type="email"
                      className={`form-control border ${errorEmail ? 'border-danger' : 'border-black'}`}
                      id="inputEmail"
                      style={styleInputSesion}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                    />
                    {errorEmail && <small className='text-danger'>* Debe ingresar un correo electrónico</small>}
                  </div>
                  
                  {/* Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label text-black"><b>Contraseña</b></label>
                    <input
                      type="password"
                      className={`form-control border ${errorPassword ? 'border-danger' : 'border-black'}`}
                      id="inputPassword"
                      style={styleInputSesion}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                    />
                    {errorPassword && <small className='text-danger'>* Debe ingresar una contraseña</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-black">
                      ¿No tiene cuenta?
                      <Link to='/crear-cuenta' className='text-black ms-2'>Crear una</Link>
                    </label>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">Ingresar</button>
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