import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/navbar";
import Footer from "./components/footer";
import './App.css';
// Páginas (crear componentes vacíos por ahora)
import Inicio from "./pages/inicio";
import Productos from "./pages/productos";
import Stock from "./pages/stock";
import Usuarios from "./pages/usuarios";
import Ventas from "./pages/ventas";
import Login from "./pages/login";
import Carrito from "./pages/carrito";
import Seleccion from "./pages/seleccion";
import OrdenConfirmadaPage from "./pages/ordenConfirmada";
import OrdenEnviadaPage from "./pages/ordenEnviada";
import CrearProductoPage from "./pages/crearProducto";
import EditarProductoPage from "./pages/editarProducto";
import EditarProductoSinStockPage from "./pages/editarproductosinstock";
import OrdenesAceptadasPage from "./pages/OrdenesAceptadasPage";

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
          <Route path="/ordenConfirmada/:ordenId" element={<OrdenConfirmadaPage />} />
          <Route path="/ordenEnviada/:orden_id" element={<OrdenEnviadaPage />} />
          <Route path="/crearProducto" element={<CrearProductoPage />} />
          <Route path="/productos/editar/:id" element={<EditarProductoPage />} />
          <Route path="/productos/editarSinStock/:id" element={<EditarProductoSinStockPage />} />
          <Route path="/ventas/ordenes-aceptadas" element={<OrdenesAceptadasPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
