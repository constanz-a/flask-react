import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Opcional para estilos

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Mantenedor de Productos</Link></li>
        <li><Link to="/stock">Mantenedor de Stock</Link></li>
        <li><Link to="/usuarios">Mantenedor de Usuarios</Link></li>
        <li><Link to="/ventas">Mantenedor de Ventas</Link></li>
        <li><Link to="/login">Inicio de Sesión</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
        <li><Link to="/seleccion">Seleccionar Productos</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
