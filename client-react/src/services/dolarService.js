export async function obtenerValorDolar() {
  const res = await fetch('http://localhost:5000/api/dolar');
  if (!res.ok) throw new Error('Error al obtener el dólar');
  const data = await res.json();
  return data.dolar;
}
