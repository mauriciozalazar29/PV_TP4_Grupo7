
const ProductItem = ({ product, setEditingProduct, deleteProduct }) => {
  return (
    <li className="product-item">
      <div className="product-info">
        <h3>{product.descripcion}</h3>
        <p>ID: {product.id}</p>
        <p>Precio Unitario: ${product.precioUnitario.toFixed(2)}</p>
        <p>Descuento: {product.descuento}%</p>
        <p>Precio con Descuento: ${product.precioConDescuento.toFixed(2)}</p>
        <p>Stock: {product.stock}</p>
      </div>
      <div className="product-actions">
        <button onClick={() => setEditingProduct(product)}>
          Editar
        </button>
        <button onClick={() => {
          if(window.confirm(`¿Estás seguro de eliminar "${product.descripcion}"?`)) {
            deleteProduct(product.id)
          }
        }}>
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default ProductItem