import { useState, useEffect, useMemo, useCallback } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import './App.css' 


function App() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)

  // Calcular productos con descuento
  const productsWithDiscount = useMemo(() => {
    return products.map(product => ({
      ...product,
      precioConDescuento: product.precioUnitario * (1 - product.descuento/100)
    }))
  }, [products])

  // Filtrar productos para búsqueda
  const filteredProducts = useMemo(() => {
    return productsWithDiscount.filter(product => 
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
    )
  }, [productsWithDiscount, searchTerm])

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  // Cargar desde localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  // Funciones CRUD con useCallback
  const addProduct = useCallback((newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }])
  }, [products])

  const updateProduct = useCallback((updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ))
    setEditingProduct(null)
  }, [products])

  const deleteProduct = useCallback((id) => {
    setProducts(products.filter(p => p.id !== id))
  }, [products])

  return (
    <div className="app">
      <h1>Gestión de Productos</h1>
      <SearchBar onSearch={setSearchTerm} />
      <ProductForm 
        addProduct={addProduct} 
        updateProduct={updateProduct} 
        editingProduct={editingProduct}
        cancelEdit={() => setEditingProduct(null)}
      />
      <ProductList 
        products={filteredProducts} 
        setEditingProduct={setEditingProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  )
}

export default App