const API = 'http://localhost:5000';

export const login = async (correo, password) => {
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password }),
    });

    if (!res.ok) {
      // Si el servidor devuelve un error, obtenemos el mensaje de error
      const error = await res.json();
      throw new Error(error.message || 'Credenciales incorrectas');
    }

    const data = await res.json();
    
    // Guardamos tanto el clienteId como el token en localStorage
    localStorage.setItem('token', data.token);  // Guardamos el token
    localStorage.setItem('clienteId', data.clienteId);  // Guardamos el clienteId

    // Devolvemos los datos del login (incluyendo el clienteId y token)
    return data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw new Error(error.message || 'Hubo un problema al intentar iniciar sesión.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');  // Eliminar token al hacer logout
  localStorage.removeItem('clienteId');  // Eliminar clienteId al hacer logout
};

export const registro = async (nombre, correo, password, direccion) => {
  try {
    const res = await fetch(`${API}/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, password, direccion }),
    });

    if (!res.ok) {
      // Si el servidor devuelve un error, obtenemos el mensaje de error
      const error = await res.json();
      throw new Error(error.message || 'Error al registrarse');
    }

    return res.json();
  } catch (error) {
    console.error('Error en el registro:', error);
    throw new Error(error.message || 'Hubo un problema al intentar registrarse.');
  }
};
