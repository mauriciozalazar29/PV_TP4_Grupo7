const ProductItem = ({ producto, setProductoEditando, eliminarProducto }) => {
    return (
      <div className="product-item">
        <h3>{producto.descripcion}</h3>
        <p><strong>ID:</strong> {producto.id}</p>
        <p><strong>Precio:</strong> ${producto.precioUnitario.toFixed(2)}</p>
        <p><strong>Descuento:</strong> {producto.descuento}%</p>
        <p><strong>Precio con Descuento:</strong> ${producto.precioConDescuento.toFixed(2)}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>
        <button onClick={() => setProductoEditando(producto)}>Editar</button>
        <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
      </div>
    );
  };
  
  export default ProductItem;
  