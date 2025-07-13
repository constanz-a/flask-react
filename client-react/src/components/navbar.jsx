import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaUser,FaPowerOff,FaShoppingCart  } from "react-icons/fa";
import { logout } from '../services/loginregistroService';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
const isLoggedIn = !!localStorage.getItem('token');
const handleLogout = () => {
  logout();
  navigate('/');
  window.location.reload(); // Opcional: para forzar que se actualicen todos los componentes
};

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Inicio</Link></li>
        <li className="dropdown">
          <span className="dropbtn">Mantenedor de Productos</span>
          <ul className="dropdown-content">
            <li><Link to="/productos">Listado de Productos</Link></li>
            <li><Link to="/crearProducto">Agregar Producto</Link></li>
          </ul>
        </li>
        <li><Link to="/ventas/ordenes-aceptadas">Ordenes aceptadas</Link></li>
        <li><Link to="/stock">Mantenedor de Stock</Link></li>
        <li><Link to="/usuarios">Mantenedor de Usuarios</Link></li>
        <li><Link to="/ventas">Mantenedor de Ventas</Link></li>
        <li><Link to="/seleccion">Seleccionar Productos</Link></li>
        <li>
  <Link to="/carrito" title="Carrito">
    <FaShoppingCart size={20} />
  </Link>
</li>
       {isLoggedIn ? (
  <li title="Cerrar sesión">
    <button onClick={handleLogout} className="icon-button">
      <FaPowerOff size={20} />
    </button>
  </li>
) : (
  <li title="Inicio de sesión">
    <Link to="/login">
      <FaUser size={20} />
    </Link>
  </li>
)}


      </ul>
    </nav>
  );
}

export default Navbar;
