import React, { useState } from 'react';
import { createUsuario } from '../services/userService';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    usuario: '',
    rol: '',
    password: '', // Asegúrate de incluir la contraseña
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUsuario(formData);
      onSubmit(response.usuario); // Si todo es exitoso, pasa el usuario creado a la función 'onSubmit'
      alert("Usuario creado con éxito");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Error al crear el usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>RUT</label>
        <input
          type="text"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Usuario</label>
        <input
          type="text"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rol</label>
        <input
          type="text"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UserForm;
