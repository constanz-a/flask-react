import React, { useState, useEffect } from 'react';
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../services/userService';
import UserCard from '../components/userCard';
import UserForm from '../components/userForm';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener todos los usuarios al cargar
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data || []); // Evitar errores si data es undefined
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // Crear usuario
  const handleCreate = async (formData) => {
    try {
      const newUser = await createUsuario(formData);
      setUsuarios((prev) => [...prev, newUser.usuario]);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  // Actualizar usuario
  const handleEdit = async (formData) => {
    try {
      const updatedUser = await updateUsuario(usuarioEdit.id, formData);
      setUsuarios((prev) =>
        prev.map((user) =>
          user.id === updatedUser.usuario.id ? updatedUser.usuario : user
        )
      );
      setUsuarioEdit(null);
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Cargar usuario para edición
  const handleEditForm = (id) => {
    const userToEdit = usuarios.find((user) => user.id === id);
    if (userToEdit) {
      setUsuarioEdit(userToEdit);
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setUsuarioEdit(null);
  };

  return (
    <div className="usuarios-container">
      <h1>Gestión de Usuarios</h1>

      {/* Formulario de creación o edición */}
      <UserForm
        usuario={usuarioEdit}
        onSubmit={usuarioEdit ? handleEdit : handleCreate}
        onCancel={usuarioEdit ? handleCancelEdit : null}
      />

      {/* Listado de usuarios */}
      <div className="user-list">
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <UserCard
              key={usuario.id}
              usuario={usuario}
              onEdit={handleEditForm}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
