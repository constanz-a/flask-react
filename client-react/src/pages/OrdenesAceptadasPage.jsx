import React, { useEffect, useState } from 'react';
import { obtenerOrdenesAceptadas } from '../services/ordenService';

const OrdenesAceptadasPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarOrdenes = async () => {
    try {
      setCargando(true);
      setError(null);

      const ordenesAceptadas = await obtenerOrdenesAceptadas();
      setOrdenes(ordenesAceptadas);

      const detallesRes = await Promise.all(
        ordenesAceptadas.map(async (orden) => {
          const res = await fetch(`http://localhost:5000/orden/${orden.id}`);
          if (!res.ok) throw new Error('Error al obtener detalle de orden');
          return await res.json();
        })
      );

      const detallesMap = {};
      ordenesAceptadas.forEach((orden, i) => {
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
    cargarOrdenes();
  }, []);

  if (cargando) return <p>Cargando órdenes...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ordenes.length) return <p>No hay órdenes aceptadas.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Órdenes Aceptadas</h1>
      {ordenes.map((orden) => (
        <OrdenDetalleAceptada key={orden.id} detalle={detalles[orden.id]} />
      ))}
    </div>
  );
};

const OrdenDetalleAceptada = ({ detalle }) => {
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
        {(detalle.detalles || []).map((item, i) => (
          <li key={i}>
            {item.producto.nombreProducto} - Cantidad: {item.cantidad} - Precio Unit: ${item.precio_unitario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdenesAceptadasPage;
