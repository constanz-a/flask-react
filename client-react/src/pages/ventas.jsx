import React, { useEffect, useState } from 'react';
import { obtenerOrdenesPendientes, actualizarEstadoOrden } from '../services/ordenService';

const VendedorPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [detalles, setDetalles] = useState({}); 
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  const cargarOrdenesConDetalle = async () => {
    try {
      setCargando(true);
      setError(null);

      const ordenesPendientes = await obtenerOrdenesPendientes();
      setOrdenes(ordenesPendientes);

      const detallesRes = await Promise.all(
        ordenesPendientes.map(async (orden) => {
          const res = await fetch(`http://localhost:5000/orden/${orden.id}`);
          if (!res.ok) throw new Error('Error al obtener detalle de orden');
          return await res.json();
        })
      );

      const detallesMap = {};
      ordenesPendientes.forEach((orden, i) => {
        detallesMap[orden.id] = detallesRes[i];
      });

      setDetalles(detallesMap);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarOrdenesConDetalle();
  }, []);

  const manejarRespuestaOrden = async (ordenId, estado) => {
    try {
      await actualizarEstadoOrden(ordenId, estado);
      alert(`Orden ${estado}`);
      cargarOrdenesConDetalle(); // Recargar todo para ver cambios
    } catch (e) {
      alert('Error al actualizar la orden: ' + e.message);
    }
  };

  if (cargando) return <p>Cargando órdenes...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ordenes.length) return <p>No hay órdenes pendientes.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Órdenes Pendientes</h1>
      {ordenes.map((orden) => (
        <OrdenDetalle
          key={orden.id}
          detalle={detalles[orden.id]}
          onAceptar={() => manejarRespuestaOrden(orden.id, 'aceptada')}
          onRechazar={() => manejarRespuestaOrden(orden.id, 'rechazada')}
        />
      ))}
    </div>
  );
};

const OrdenDetalle = ({ detalle, onAceptar, onRechazar }) => {
  if (!detalle) return <p>Cargando detalle...</p>;

  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h2 className="font-semibold">Orden #{detalle.id}</h2>
      <p>Cliente ID: {detalle.cliente_id}</p>
      <p>Estado: {detalle.estado}</p>
      <p>Tipo de entrega: {detalle.tipo_entrega}</p>
      {detalle.direccion_envio && <p>Dirección: {detalle.direccion_envio}</p>}
      <h3 className="mt-2 font-semibold">Productos:</h3>
      <ul>
        {(detalle.detalles || []).map((item) => (
          <li key={item.id}>
            {item.producto.nombreProducto} - Cantidad: {item.cantidad} - Precio Unit: ${item.precio_unitario}
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <button
          onClick={onAceptar}
          className="mr-2 bg-green-600 text-white px-4 py-1 rounded"
        >
          Aceptar
        </button>
        <button
          onClick={onRechazar}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default VendedorPage;
