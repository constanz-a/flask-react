import React from 'react';

const UserCard = ({ usuario, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <h3>{usuario.nombre}</h3>
      <p>RUT: {usuario.rut}</p>
      <p>Usuario: {usuario.usuario}</p>
      <p>Rol: {usuario.rol}</p>
      <button onClick={() => onEdit(usuario.id)}>Editar</button>
      <button onClick={() => onDelete(usuario.id)}>Eliminar</button>
    </div>
  );
};

export default UserCard;
