const API_URL = "http://localhost:5000/usuarios";

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }
    const data = await response.json();
    return data.usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};


export const getUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

export const createUsuario = async (usuarioData) => {
  try {
    const response = await fetch("http://localhost:5000/usuarios", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData), 
    });

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const updateUsuario = async (id, usuarioData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar usuario");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;  
  }
};
