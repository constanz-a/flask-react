const API = 'http://localhost:5000';

export const obtenerProductos = async () => {
  const res = await fetch(`${API}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  const data = await res.json();
  return data.productos;
};

export const obtenerProducto = async (id) => {
  const res = await fetch(`${API}/productos/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return await res.json();
};

export const crearProducto = async (producto) => {
  const res = await fetch(`${API}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error al crear producto');
  }
  return await res.json();
};

export const actualizarProducto = async (id, producto) => {
  const res = await fetch(`${API}/productos/${id}`, {
    method: 'PUT', // o PATCH
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error al actualizar producto');
  }
  return await res.json();
};
