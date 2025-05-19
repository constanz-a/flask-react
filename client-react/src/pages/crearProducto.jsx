import React, { useState } from 'react';
import { crearProducto } from '../services/productoService';
import { useNavigate } from 'react-router-dom';

const CrearProductoPage = () => {
  const [form, setForm] = useState({
    nombreProducto: '',
    descripcionProducto: '',
    precioProducto: '',
    stockProducto: '',
    imagen_url: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Convertir precio y stock a número
      const producto = {
        ...form,
        precioProducto: parseFloat(form.precioProducto),
        stockProducto: parseInt(form.stockProducto, 10),
      };
      await crearProducto(producto);
      alert('Producto creado con éxito');
      navigate('/productos'); // redirige a la lista de productos
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            name="nombreProducto"
            value={form.nombreProducto}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Descripción:
          <textarea
            name="descripcionProducto"
            value={form.descripcionProducto}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Precio:
          <input
            type="number"
            step="0.01"
            name="precioProducto"
            value={form.precioProducto}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Stock:
          <input
            type="number"
            name="stockProducto"
            value={form.stockProducto}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          URL Imagen (opcional):
          <input
            type="text"
            name="imagen_url"
            value={form.imagen_url}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CrearProductoPage;
