const CardProduct = ({ producto }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{producto.nombreProducto}</h2>
      <p className="text-gray-600">{producto.descripcionProducto}</p>
      <p className="mt-2 font-bold">${producto.precioProducto}</p>
      <p className="text-sm text-gray-500">Stock: {producto.stockProducto}</p>
      {producto.imagen_url && (
        <img
          src={producto.imagen_url}
          alt={producto.nombreProducto}
          className="mt-2 w-full h-40 object-cover rounded"
        />
      )}
    </div>
  );
};

export default CardProduct;