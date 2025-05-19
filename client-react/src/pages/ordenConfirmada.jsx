// components/detalleOrdenC.jsx
import React from 'react';

const DetalleOrden = ({ orden }) => {
  return (
    <div>
      <p><strong>ID Orden:</strong> {orden.id}</p>
      <p><strong>Cliente ID:</strong> {orden.cliente_id}</p>
      <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
      <p><strong>Tipo de entrega:</strong> {orden.tipo_entrega}</p>
      {orden.tipo_entrega === 'despacho' && (
        <p><strong>Dirección:</strong> {orden.direccion_envio}</p>
      )}
      <p><strong>Estado:</strong> {orden.estado}</p>

      <h3>Productos:</h3>
      <ul>
        {orden.detalles.map((detalle, i) => (
          <li key={i}>
            {detalle.nombre_producto} - Cantidad: {detalle.cantidad} - Precio unitario: ${detalle.precio_unitario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleOrden;
