import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:underline">Inicio</Link>
        </li>
        <li className="relative group">
          <button className="hover:underline">Mantenedor de Productos</button>
          <ul className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg">
            <li>
              <Link to="/productos" className="block px-4 py-2 hover:bg-gray-100">
                Listado de Productos
              </Link>
            </li>
            <li>
              <Link to="/crearProducto" className="block px-4 py-2 hover:bg-gray-100">
                Agregar Producto
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/stock" className="hover:underline">Mantenedor de Stock</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">Inicio de Sesión</Link>
        </li>
        <li>
          <Link to="/carrito" className="hover:underline">Carrito</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarBodeguero;
