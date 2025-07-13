import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProductoSinStockPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const res = await fetch(`http://localhost:5000/productos/${id}`);
        if (!res.ok) throw new Error('No se pudo obtener el producto');
        const data = await res.json();
        setProducto(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]:
        name === 'precioProducto'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar todos los campos excepto stockProducto
      const {
        nombreProducto,
        descripcionProducto,
        precioProducto,
        imagen_url,
      } = producto;

      const res = await fetch(`http://localhost:5000/productos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreProducto,
          descripcionProducto,
          precioProducto,
          imagen_url,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al actualizar producto');
      }

      alert('Producto actualizado con éxito');
      navigate('/productos');
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Producto (sin modificar stock)</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <div>
          <label className="block font-semibold">Nombre:</label>
          <input
            type="text"
            name="nombreProducto"
            value={producto.nombreProducto}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Descripción:</label>
          <input
            type="text"
            name="descripcionProducto"
            value={producto.descripcionProducto}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Precio:</label>
          <input
            type="number"
            name="precioProducto"
            value={producto.precioProducto}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Stock:</label>
          <input
            type="number"
            name="stockProducto"
            value={producto.stockProducto}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold">Imagen (URL):</label>
          <input
            type="text"
            name="imagen_url"
            value={producto.imagen_url || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProductoSinStockPage;
