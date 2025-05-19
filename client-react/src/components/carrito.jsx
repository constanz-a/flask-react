// src/components/Carrito.jsx
import React from 'react';

const Carrito = ({ carrito, handleEliminar }) => {
  if (carrito.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="space-y-4">
      {carrito.map((item) => (
        <div key={item.id} className="border p-4 rounded flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{item.producto.nombreProducto}</h3>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio: ${item.producto.precioProducto}</p>
          </div>
          <button
            onClick={() => handleEliminar(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;
