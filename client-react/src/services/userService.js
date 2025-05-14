const API_URL = "http://localhost:5000/usuarios";  // Cambia esto si tu backend tiene otra URL

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }
    const data = await response.json();
    return data.usuarios;  // Asegúrate de que el backend devuelva la propiedad 'usuarios'
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Obtener un usuario por su ID
export const getUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const data = await response.json();
    return data;  // Retorna todo el usuario
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  try {
    const response = await fetch("http://localhost:5000/usuarios", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData), // Asegúrate de que los datos estén correctos
    });

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }

    const data = await response.json();
    return data; // Devuelve el usuario creado
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};


// Actualizar un usuario
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
    return data;  // Devuelve el usuario actualizado
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',  // El verbo HTTP es DELETE
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    const data = await response.json();  // Respuesta en formato JSON
    return data;  // Devuelves los datos de la respuesta, que pueden ser útiles (como un mensaje)
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;  // Lanza el error para manejarlo en la UI si es necesario
  }
};
