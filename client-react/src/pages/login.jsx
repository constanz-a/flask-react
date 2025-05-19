import React, { useState } from 'react';
import { login } from '../services/loginregistroService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
  event.preventDefault();

  if (!correo || !password) {
    setError('Por favor ingresa ambos, correo y contraseña');
    return;
  }

  try {
    const data = await login(correo, password);
    const { clienteId, token } = data;

    if (token && clienteId) {
      // Guardamos en localStorage
      localStorage.setItem('clienteId', clienteId);
      localStorage.setItem('token', token);

      // Luego navegamos a carrito
      navigate('/carrito');
    } else {
      setError('Datos de autenticación inválidos');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    setError(error.message || 'Error al iniciar sesión. Inténtalo nuevamente.');
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="correo" className="block">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
