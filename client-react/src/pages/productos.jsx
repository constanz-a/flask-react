import { useEffect, useState } from "react";
import CardProduct from "../components/productCard";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/productos")
      .then((response) => response.json())  // Convierte la respuesta a JSON
      .then((data) => setProductos(data.productos))  // Asigna los productos a tu estado
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  return (
    <div>
      {productos.map((producto) => (
        <CardProduct key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default Home;
