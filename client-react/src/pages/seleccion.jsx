import React, { useEffect, useState } from 'react';
import { agregarAlCarrito } from '../services/carritoService';

const API = 'http://localhost:5000';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState(null);

  useEffect(() => {
    // Obtener clienteId guardado en localStorage
    const storedClienteId = localStorage.getItem('clienteId');
    if (storedClienteId) {
      setClienteId(storedClienteId);
    }
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API}/productos`);
        const data = await res.json();
        setProductos(data.productos || data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleAgregar = async (productoId) => {
    if (!clienteId) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    try {
      await agregarAlCarrito(clienteId, productoId, 1);
      alert('Producto agregado al carrito');
    } catch (error) {
      alert('Error al agregar al carrito: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Productos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {productos.map((producto) => (
          <div key={producto.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <h3>{producto.nombreProducto}</h3>
            <p>{producto.descripcionProducto}</p>
            <p><strong>${producto.precioProducto}</strong></p>
            <button onClick={() => handleAgregar(producto.id)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosPage;
