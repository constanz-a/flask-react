const API = 'http://localhost:5000';

// Función para cargar el carrito
export const cargarCarrito = async (clienteId) => {
  if (!clienteId) return;
  try {
    const res = await fetch(`${API}/carrito/${clienteId}`);
    if (!res.ok) throw new Error('Error al obtener el carrito');
    const items = await res.json();
    console.log('Carrito recibido:', items); // Para depuración
    return items;
  } catch (error) {
    console.error('Error al cargar el carrito:', error);
    throw error;
  }
};

// Exporta las otras funciones necesarias
export const eliminarDelCarrito = async (itemId) => {
  const res = await fetch(`${API}/carrito/${itemId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar del carrito');
  return res.json();
};

export const agregarAlCarrito = async (clienteId, productoId, cantidad = 1) => {
  const res = await fetch(`${API}/carrito`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cliente_id: clienteId, producto_id: productoId, cantidad })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al agregar al carrito');
  }
  return res.json();
};
