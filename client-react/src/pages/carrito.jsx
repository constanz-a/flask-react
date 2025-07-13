import React, { useEffect, useState } from 'react';
import { cargarCarrito, eliminarDelCarrito } from '../services/carritoService';
import { crearOrden } from '../services/ordenService';
import { useNavigate } from 'react-router-dom';
import Carrito from '../components/carrito';
import { crearTransaccionWebpay } from '../services/transbankService';

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState('retiro');
  const [direccion, setDireccion] = useState('');
  const [clienteId, setClienteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedClienteId = localStorage.getItem('id');
    if (storedClienteId) {
      setClienteId(storedClienteId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const cargarProductosDelCarrito = async () => {
    if (!clienteId) return;
    try {
      const items = await cargarCarrito(clienteId);
      setCarrito(items);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  useEffect(() => {
    if (clienteId) cargarProductosDelCarrito();
  }, [clienteId]);

  const handleEliminar = async (itemId) => {
    await eliminarDelCarrito(itemId);
    await cargarProductosDelCarrito();
  };

  const total = carrito.reduce((sum, item) => sum + item.producto.precioProducto * item.cantidad, 0);

  const handleConfirmarOrden = async () => {
  try {
    const res = await crearOrden({
      cliente_id: clienteId,
      tipo_entrega: tipoEntrega,
      direccion_envio: tipoEntrega === 'despacho' ? direccion : null,
    });

    if (!res.orden || !res.orden.id) {
      alert('No se pudo crear la orden');
      return;
    }

    const ordenId = res.orden.id;

    const sessionId = `cliente-${clienteId}-${Date.now()}`;
    const returnUrl = `http://localhost:5173/ordenConfirmada`;
    const transaccion = await crearTransaccionWebpay(
      `orden-${ordenId}`,
      sessionId,
      total,
      returnUrl
    );

    const form = document.createElement("form");
    form.method = "POST";
    form.action = transaccion.url;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token_ws";
    input.value = transaccion.token;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

  } catch (error) {
    alert('Error al procesar el pago');
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
