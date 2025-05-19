// services/productService.js
const API = 'http://localhost:5000';

export const getProductos = async () => {
  const res = await fetch(`${API}/productos`);
  const data = await res.json();
  return data.productos;
};
