import React, { useEffect, useState } from 'react';
import { agregarAlCarrito } from '../services/carritoService';
import { obtenerValorDolar } from '../services/dolarService';  // Importa el servicio

const API = 'http://localhost:5000';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [dolar, setDolar] = useState(null);  // Estado para el dólar

  useEffect(() => {
    const storedClienteId = localStorage.getItem('id');
    if (storedClienteId) {
      setClienteId(Number(storedClienteId));
    }
  }, []);

  // Traer productos
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

  // Traer valor del dólar
  useEffect(() => {
    obtenerValorDolar()
      .then(setDolar)
      .catch(err => {
        console.error('Error al obtener el dólar:', err);
        setDolar(null);
      });
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
        {productos.map((producto) => {
          // Conversión a dólar con 2 decimales, o mostrar '...' si no hay dato
          const precioDolares = dolar
            ? (producto.precioProducto / dolar).toFixed(2)
            : '...';

          return (
            <div key={producto.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
              <h3>{producto.nombreProducto}</h3>
              <p>{producto.descripcionProducto}</p>
              <p><strong>${producto.precioProducto} CLP</strong></p>
              <p><em>${precioDolares} USD</em></p>
              <button onClick={() => handleAgregar(producto.id)}>Agregar al carrito</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductosPage;
