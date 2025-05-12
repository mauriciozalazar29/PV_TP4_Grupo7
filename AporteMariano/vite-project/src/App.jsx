import { useState, useEffect, useCallback } from 'react';
import ProductForm from './Componentes/ProductForm';
import ProductList from './Componentes/ProductList';
import SearchBar from './Componentes/SearchBar';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);

  // Agregar producto (limpia búsqueda para que aparezca inmediatamente)
  const agregarProducto = useCallback((producto) => {
    setProductos((prev) => [...prev, producto]);
    setTerminoBusqueda(''); // Limpiar búsqueda al agregar
  }, []);

  // Actualizar producto
  const actualizarProducto = useCallback((productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
    );
    setProductoEditando(null);
  }, []);

  // Eliminar producto
  const eliminarProducto = useCallback((id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Ordenar productos: coincidencias primero, luego los demás
  const productosOrdenados = productos.sort((a, b) => {
    if (!terminoBusqueda) return 0; // Sin búsqueda → orden original
    
    // Si 'a' coincide y 'b' no, 'a' va primero
    const aCoincide = (
      a.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      a.id.toString().includes(terminoBusqueda)
    );
    const bCoincide = (
      b.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      b.id.toString().includes(terminoBusqueda)
    );
    
    if (aCoincide && !bCoincide) return -1; // 'a' primero
    if (!aCoincide && bCoincide) return 1;  // 'b' primero
    return 0; // Misma prioridad
  });

  return (
    <div className="app">
      <h1>Gestión de Productos</h1>
      <SearchBar onBuscar={setTerminoBusqueda} />
      <ProductForm
        addProducto={agregarProducto}
        updateProducto={actualizarProducto}
        editProducto={productoEditando}
        cancelEdit={() => setProductoEditando(null)}
      />
      <ProductList
        productos={productosOrdenados}
        terminoBusqueda={terminoBusqueda} // Para resaltar coincidencias
        setProductoEditando={setProductoEditando}
        eliminarProducto={eliminarProducto}
      />
    </div>
  );
}

export default App;