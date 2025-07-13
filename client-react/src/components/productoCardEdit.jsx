import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductoCardEditable = ({ producto }) => {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/productos/editarSinStock/${producto.id}`);
  };

  return (
    <div className='p-6 max-w-4xl mx-auto'>
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-1">{producto.nombreProducto}</h3>
      <p className="mb-1">{producto.descripcionProducto}</p>
      <p className="mb-2">Precio: ${producto.precioProducto}</p>
      <p className="mb-4">Stock: {producto.stockProducto}</p>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        onClick={handleEditar}
      >
        Editar Producto
      </button>
    </div></div>
  );
};

export default ProductoCardEditable;
