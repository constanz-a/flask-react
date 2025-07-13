import React from 'react';

const DetalleOrden = ({ orden }) => {
  return (
    <div className="border rounded p-4 shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Resumen de la Orden</h2>
      <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
      <p><strong>Tipo de entrega:</strong> {orden.tipo_entrega}</p>
      {orden.direccion_envio && <p><strong>Dirección:</strong> {orden.direccion_envio}</p>}
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Productos:</h3>
      <ul>
        {orden.detalles.map((item) => (
          <li key={item.id} className="mb-2">
            <p><strong>{item.producto.nombreProducto}</strong></p>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio unitario: ${item.precio_unitario}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleOrden;
