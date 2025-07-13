const API = 'http://localhost:5000';

// loginService.js
export const login = async (correo, password) => {
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Credenciales incorrectas');
    }

    const data = await res.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('nombre', data.nombre);
    localStorage.setItem('tipo', data.tipo);
    localStorage.setItem('rol', data.rol);

    return data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw new Error(error.message || 'Hubo un problema al intentar iniciar sesión.');
  }
};


export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('nombre');
  localStorage.removeItem('tipo');
  localStorage.removeItem('rol');
};


export const registro = async (nombre, correo, password, direccion) => {
  try {
    const res = await fetch(`${API}/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, password, direccion }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al registrarse');
    }

    return res.json();
  } catch (error) {
    console.error('Error en el registro:', error);
    throw new Error(error.message || 'Hubo un problema al intentar registrarse.');
  }
};
