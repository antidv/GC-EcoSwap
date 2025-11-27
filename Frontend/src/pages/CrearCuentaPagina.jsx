import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';
import LoginEcoSwap from '../assets/login_ecoswap.png';

function CrearCuenta() {
  const navigate = useNavigate();
  const { registrar } = useUsuario();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [ruc, setRuc] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorRuc, setErrorRuc] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const styleInputSesion = { maxWidth: "30rem" };
  const styleCardSesion = { maxWidth: "30rem", backgroundColor: "#D9D9D9" };
  const styleImageLogin = { maxWidth: "20rem", borderRadius: "5%", padding: "10px 20px" };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorEmail(false); setErrorPassword(false); setErrorName(false);
    setErrorRuc(false); setErrorAddress(false); setErrorPhone(false);

    let esValido = true;
    if (email.trim() === '') { setErrorEmail(true); esValido = false; } 
    if (password.trim() === '') { setErrorPassword(true); esValido = false; }
    if (name.trim() === '') { setErrorName(true); esValido = false; }
    if (ruc.trim() === '' || ruc.length !== 11) { setErrorRuc(true); esValido = false; }
    if (address.trim() === '') { setErrorAddress(true); esValido = false; }
    if (phone.trim() === '' || phone.length < 7) { setErrorPhone(true); esValido = false; }
    
    if (esValido) {
      console.log("Enviando datos al backend...");

      const datosParaBackend = {
        nombreEmpresa: name,
        ruc: ruc,
        direccion: address,
        telefono: phone,
        email: email,
        password: password
      };

      const resultado = await registrar(datosParaBackend);

      if (resultado.success) {
        alert("¡Cuenta creada con éxito! Por favor inicie sesión.");
        navigate('/login');
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

          <div className="col-12 col-md-6 justify-content-start">
            <div className="card" style={styleCardSesion}>
              <div className="card-body">
                <h4 className="text-center mb-3">Crear cuenta</h4>
                <form onSubmit={handleSubmit}>
                  
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label text-black"><b>Correo electrónico</b></label>
                    <input type="email" className={`form-control border ${errorEmail ? 'border-danger' : 'border-black'}`}
                      id="inputEmail" style={styleInputSesion} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" />
                    {errorEmail && <small className='text-danger'>* Debe ingresar un correo</small>}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label text-black"><b>Contraseña</b></label>
                    <input type="password" className={`form-control border ${errorPassword ? 'border-danger' : 'border-black'}`}
                      id="inputPassword" style={styleInputSesion} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                    {errorPassword && <small className='text-danger'>* Debe ingresar una contraseña</small>}
                  </div>

                  <h6 className="text-center mb-3">Datos generales</h6>
                  
                  {/* Nombre y RUC */}
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label htmlFor="inputName" className="form-label text-black"><b>Nombre</b></label>
                      <input type="text" className={`form-control border ${errorName ? 'border-danger' : 'border-black'}`}
                        id="inputName" style={styleInputSesion} value={name} onChange={(e) => setName(e.target.value)} placeholder='Juan Pérez' />
                      {errorName && <small className='text-danger'>* Ingrese nombre</small>}
                    </div>

                    <div className="col-6 mb-3">
                      <label htmlFor="inputRuc" className="form-label text-black"><b>R.U.C</b></label>
                      <input type="text" className={`form-control border ${errorRuc ? 'border-danger' : 'border-black'}`}
                        id="inputRuc" style={styleInputSesion} value={ruc} onChange={(e) => setRuc(e.target.value)} placeholder='12345678901' />
                      {errorRuc && <small className='text-danger'>* RUC de 11 dígitos</small>}
                    </div>
                  </div>

                  {/* Dirección y Teléfono */}
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label htmlFor="inputAddress" className="form-label text-black"><b>Dirección</b></label>
                      <input type="text" className={`form-control border ${errorAddress ? 'border-danger' : 'border-black'}`}
                        id="inputAddress" style={styleInputSesion} value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Calle Falsa 123' />
                      {errorAddress && <small className='text-danger'>* Ingrese dirección</small>}
                    </div>
                    
                    <div className="col-6 mb-3">
                      <label htmlFor="inputPhone" className="form-label text-black"><b>Teléfono</b></label>
                      <input type="text" className={`form-control border ${errorPhone ? 'border-danger' : 'border-black'}`}
                        id="inputPhone" style={styleInputSesion} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='912345678' />
                      {errorPhone && <small className='text-danger'>* Ingrese teléfono</small>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-black">
                      ¿Tiene cuenta? <Link to='/login' className='text-black ms-2'>Inicie sesión</Link>
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

export default CrearCuenta;