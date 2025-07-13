// components/ProductoCard.jsx
import React from 'react';

const ProductoCard = ({ producto, onAgregar }) => {
  return (
    <div className='container'>
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{producto.nombreProducto}</h3>
      <p>{producto.descripcionProducto}</p>
      <p>Precio: ${producto.precioProducto}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onAgregar(producto.id)}
      >
        Agregar al carrito
      </button>
    </div>
    </div>
  );
};

export default ProductoCard;
