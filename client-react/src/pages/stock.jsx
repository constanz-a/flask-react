import React, { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productoService';
import { useNavigate } from 'react-router-dom';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
        setError(null);
      } catch (e) {
        setError('Error cargando productos');
      }
    };
    cargarProductos();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{producto.nombreProducto}</td>
              <td className="border border-gray-300 px-4 py-2">${producto.precioProducto.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.stockProducto}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => navigate(`/productos/editar/${producto.id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosPage;
