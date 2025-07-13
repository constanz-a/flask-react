import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Opcional para estilos

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Inicio de Sesión</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
        <li><Link to="/seleccion">Productos</Link></li>
      </ul>
    </nav>
  );
}

export default NavbarCliente;
