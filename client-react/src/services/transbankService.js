export async function crearTransaccionWebpay(buyOrder, sessionId, amount, returnUrl) {
  const res = await fetch('http://localhost:5000/api/create-transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buy_order: buyOrder, session_id: sessionId, amount, return_url: returnUrl }),
  });
  if (!res.ok) throw new Error('Error al crear transacción');
  return res.json();
}
