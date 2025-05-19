import { useState, useEffect } from 'react';

const ProductForm = ({ addProducto, updateProducto, editProducto, cancelEdit }) => {
  const [producto, setProducto] = useState({
    id: '',
    descripcion: '',
    precioUnitario: 0,
    descuento: 0,
    stock: 0,
  });

  useEffect(() => {
    if (editProducto) {
      setProducto(editProducto);
    }
    // ❗️No se resetea el formulario al buscar
  }, [editProducto]);

  const resetForm = () => {
    setProducto({
      id: '',
      descripcion: '',
      precioUnitario: 0,
      descuento: 0,
      stock: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name === 'precioUnitario' || name === 'descuento' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productoToSubmit = {
      ...producto,
      precioConDescuento: producto.precioUnitario * (1 - producto.descuento / 100),
    };

    if (editProducto) {
      updateProducto(productoToSubmit);
    } else {
      addProducto({ ...productoToSubmit, id: Date.now() });
      resetForm(); // ✅ solo se borra al agregar
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{editProducto ? 'Editar Producto' : 'Agregar Producto'}</h2>

      {editProducto && (
        <div className="form-group">
          <label>ID:</label>
          <input type="text" value={producto.id} disabled />
        </div>
      )}

      <div className="form-group">
        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Precio Unitario:</label>
        <input
          type="number"
          name="precioUnitario"
          value={producto.precioUnitario}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Descuento (%):</label>
        <input
          type="number"
          name="descuento"
          value={producto.descuento}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label>Precio con Descuento:</label>
        <input
          type="number"
          value={(producto.precioUnitario * (1 - producto.descuento / 100)).toFixed(2)}
          readOnly
        />
      </div>

      <button type="submit">{editProducto ? 'Actualizar' : 'Agregar'}</button>
      {editProducto && <button type="button" onClick={cancelEdit}>Cancelar</button>}
    </form>
  );
};

export default ProductForm;
