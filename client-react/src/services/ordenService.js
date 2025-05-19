const API = 'http://localhost:5000';

export const obtenerOrdenesPendientes = async () => {
  const res = await fetch(`${API}/ordenes/pendientes`);
  if (!res.ok) throw new Error('Error al obtener órdenes pendientes');
  return await res.json();
};

export const actualizarEstadoOrden = async (ordenId, estado) => {
  const res = await fetch(`${API}/orden/${ordenId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al actualizar estado');
  }
  return await res.json();
};
export const crearOrden = async ({ cliente_id, tipo_entrega, direccion_envio }) => {
  const res = await fetch(`${API}/orden`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cliente_id, tipo_entrega, direccion_envio }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al crear la orden');
  }

  return data;
};
