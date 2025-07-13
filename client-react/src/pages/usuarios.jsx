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
  const [mostrarFormCrear, setMostrarFormCrear] = useState(false);
  const [mostrarListaUsuarios, setMostrarListaUsuarios] = useState(false); // estado nuevo para mostrar/ocultar listado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data || []);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const newUser = await createUsuario(formData);
      setUsuarios((prev) => [...prev, newUser.usuario]);
      setMostrarFormCrear(false);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      setUsuarios((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleEditForm = (id) => {
    const userToEdit = usuarios.find((user) => user.id === id);
    if (userToEdit) {
      setUsuarioEdit(userToEdit);
      setMostrarFormCrear(false);
    }
  };

  const handleCancelEdit = () => {
    setUsuarioEdit(null);
  };

  const toggleFormCrear = () => {
    setUsuarioEdit(null);
    setMostrarFormCrear((prev) => !prev);
  };

  const toggleListaUsuarios = () => {
    setMostrarListaUsuarios((prev) => !prev);
  };

  return (
    <div className="usuarios-container">
      <h1>Gestión de Usuarios</h1>

      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={toggleFormCrear}
      >
        {mostrarFormCrear ? 'Cerrar formulario' : 'Crear usuario'}
      </button>

      {(mostrarFormCrear || usuarioEdit) && (
        <UserForm
          usuario={usuarioEdit}
          onSubmit={usuarioEdit ? handleEdit : handleCreate}
          onCancel={() => {
            if (usuarioEdit) handleCancelEdit();
            else setMostrarFormCrear(false);
          }}
        />
      )}

      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={toggleListaUsuarios}
      >
        {mostrarListaUsuarios ? 'Ocultar usuarios' : 'Mostrar usuarios'}
      </button>

      {mostrarListaUsuarios && (
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
      )}
    </div>
  );
};

export default Usuarios;
