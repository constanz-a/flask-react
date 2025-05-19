import React, { useEffect, useState } from 'react';
import { cargarCarrito, eliminarDelCarrito } from '../services/carritoService'; // Asegúrate de importar cargarCarrito
import { crearOrden } from '../services/ordenService';
import { useNavigate } from 'react-router-dom';
import Carrito from '../components/carrito'; // Importamos el componente Carrito

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState('retiro');
  const [direccion, setDireccion] = useState('');
  const [clienteId, setClienteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedClienteId = localStorage.getItem('clienteId');
    if (storedClienteId) {
      setClienteId(storedClienteId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Llamamos la función cargarCarrito importada para cargar los productos del carrito
  const cargarProductosDelCarrito = async () => {
    if (!clienteId) return;
    try {
      const items = await cargarCarrito(clienteId); // Obtener los productos del carrito
      setCarrito(items); // Guardamos los productos en el estado
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  useEffect(() => {
    if (clienteId) cargarProductosDelCarrito(); // Cargar el carrito si tenemos el clienteId
  }, [clienteId]);

  const handleEliminar = async (itemId) => {
    await eliminarDelCarrito(itemId); // Eliminar producto del carrito
    await cargarProductosDelCarrito(); // Recargar el carrito después de eliminar
  };

  const total = carrito.reduce((sum, item) => sum + item.producto.precioProducto * item.cantidad, 0);

const handleConfirmarOrden = async () => {
  try {
    const res = await crearOrden({
      cliente_id: clienteId,
      tipo_entrega: tipoEntrega,
      direccion_envio: tipoEntrega === 'despacho' ? direccion : null,
    });
    console.log('Respuesta de crearOrden:', res);
    if (res.orden && res.orden.id) {
      navigate(`/ordenEnviada/${res.orden.id}`);
    } else {
      alert('No se pudo crear la orden');
    }
  } catch (error) {
    alert('Error al crear la orden');
    console.error(error);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito</h1>
      <Carrito carrito={carrito} handleEliminar={handleEliminar} />

      <p className="mt-4 font-bold">Total: ${total}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Tipo de entrega</h2>
        <select value={tipoEntrega} onChange={(e) => setTipoEntrega(e.target.value)} className="border p-2">
          <option value="retiro">Retiro en tienda</option>
          <option value="despacho">Despacho a domicilio</option>
        </select>

        {tipoEntrega === 'despacho' && (
          <input
            className="block mt-2 border p-2 w-full"
            placeholder="Dirección de despacho"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        )}

        <button onClick={handleConfirmarOrden} className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
          Confirmar Orden
        </button>
      </div>
    </div>
  );
};

export default CarritoPage;
