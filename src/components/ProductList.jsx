import ProductItem from './ProductItem'
import './ProductList.css'

const ProductList = ({ products, setEditingProduct, deleteProduct }) => {
  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              setEditingProduct={setEditingProduct}
              deleteProduct={deleteProduct}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductList