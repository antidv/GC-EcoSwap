import React from 'react';
import FilaTransaccion from './FilaTransaccion.jsx';

function TablaCertificados({ transacciones }) {
  const styleTabla = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: '8px',
    color: '#333',
    overflow: 'hidden'
  };
  
  const styleHeader = {
    backgroundColor: 'rgba(211, 211, 211, 0.9)',
  };

  return (
    <div style={styleTabla}>
      <table className="table table-hover align-middle mb-0">
        <thead style={styleHeader}>
          <tr>
            <th scope="col" className="ps-3">ID Transacción</th>
            <th scope="col">Comprador</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
            <th scope="col">Código</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.length > 0 ? (
            transacciones.map((tx) => (
              <FilaTransaccion key={tx.id} transaccion={tx} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No se encontraron transacciones.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaCertificados;