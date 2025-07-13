import { useEffect, useState } from "react";
import ProductoCardEditable from "../components/productoCardEdit";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data.productos))
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  return (
   <div className="p-6 max-w-4xl mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    {productos.map((producto) => (
      <ProductoCardEditable key={producto.id} producto={producto} />
    ))}
  </div>
</div>

  );
};

export default Productos;
