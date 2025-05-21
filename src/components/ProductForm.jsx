import { useState, useEffect } from 'react'
import './ProductForm.css' 

const ProductForm = ({ addProduct, updateProduct, editingProduct, cancelEdit }) => {
  const [product, setProduct] = useState({
    descripcion: '',
    precioUnitario: 0,
    descuento: 0,
    stock: 0
  })

  const [precioFinal, setPrecioFinal] = useState(0)

  // Si estamos editando, cargamos el producto
  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct)
    } else {
      setProduct({
        descripcion: '',
        precioUnitario: 0,
        descuento: 0,
        stock: 0
      })
    }
  }, [editingProduct])

  // Calcular el precio con descuento en tiempo real
  useEffect(() => {
    const precioConDescuento = product.precioUnitario * (1 - product.descuento / 100)
    setPrecioFinal(precioConDescuento)
  }, [product.precioUnitario, product.descuento])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: name === 'descripcion' ? value : Number(value)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProduct) {
      updateProduct(product)
    } else {
      addProduct(product)
    }
    setProduct({
      descripcion: '',
      precioUnitario: 0,
      descuento: 0,
      stock: 0
    })
  }

  return (
    <form onSubmit={handleSubmit} className={`product-form ${editingProduct ? 'editing' : ''}`}>
      <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
      
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={product.descripcion}
          onChange={handleChange}
          required
          placeholder="Ingrese la descripción del producto"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="precioUnitario">Precio Unitario ($):</label>
          <input
            type="number"
            id="precioUnitario"
            name="precioUnitario"
            value={product.precioUnitario}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descuento">Descuento (%):</label>
          <input
            type="number"
            id="descuento"
            name="descuento"
            value={product.descuento}
            onChange={handleChange}
            min="0"
            max="100"
            required
            placeholder="0"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            required
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label>Precio Final:</label>
          <input
            type="text"
            value={`$${precioFinal.toFixed(2)}`}
            readOnly
            disabled
            style={{ backgroundColor: '#f8f9fa' }}
          />
        </div>
      </div>

      <button type="submit">
        {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
      
      {editingProduct && (
        <button 
          type="button" 
          onClick={() => {
            cancelEdit()
            setProduct({
              descripcion: '',
              precioUnitario: 0,
              descuento: 0,
              stock: 0
            })
          }}
          className="cancel-button"
        >
          Cancelar Edición
        </button>
      )}
    </form>
  )
}

export default ProductForm