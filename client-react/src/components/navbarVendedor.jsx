import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Aquí agregaremos estilos CSS para el menú

function NavbarVendedor() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Inicio</Link></li>

        {/* Dropdown para productos */}
        <li className="dropdown">
          <span className="dropbtn">Mantenedor de Productos</span>
          <ul className="dropdown-content">
            <li><Link to="/productos">Listado de Productos</Link></li>
            <li><Link to="/crearProducto">Agregar Producto</Link></li>
          </ul>
        </li>

        <li><Link to="/stock">Mantenedor de Stock</Link></li>
        <li><Link to="/ventas">Mantenedor de Ventas</Link></li>
        <li><Link to="/login">Inicio de Sesión</Link></li>
      </ul>
    </nav>
  );
}

export default NavbarVendedor;
