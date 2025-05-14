import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/navbar";

// Páginas (crear componentes vacíos por ahora)
import Inicio from "./pages/inicio";
import Productos from "./pages/productos";
import Stock from "./pages/stock";
import Usuarios from "./pages/usuarios";
import Ventas from "./pages/ventas";
import Login from "./pages/login";
import Carrito from "./pages/carrito";
import Seleccion from "./pages/seleccion";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/seleccion" element={<Seleccion />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
