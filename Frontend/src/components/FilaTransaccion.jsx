import React from 'react';
import { Link } from 'react-router-dom';

function FilaTransaccion({ transaccion }) {

  const styleBotonCertificado = {
    backgroundColor: '#D4D4A9',
    color: '#073801',
    fontWeight: 'bold',
    border: '2px solid #073801',
    borderRadius: '8px',
    padding: '5px 10px',
    textDecoration: 'none'
  };

  const totalNumerico = parseFloat(transaccion.total);

  return (
    <tr>
      <th scope="row" className="ps-3">{transaccion.id}</th>
      <td>{transaccion.comprador}</td>
      <td>{transaccion.cantidad}</td>
      <td>S/ {!isNaN(totalNumerico) ? totalNumerico.toFixed(2) : '0,00'}</td>
      <td>{transaccion.codigo}</td>
      <td>
        <Link 
          to={`/certificado/${transaccion.id}`} 
          style={styleBotonCertificado}
          className="btn"
        >
          Certificado
        </Link>
      </td>
    </tr>
  );
}

export default FilaTransaccion;