import { useState } from 'react';

const SearchBar = ({ onBuscar }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(input.trim()); // Trim para eliminar espacios en blanco
  };

  const handleClear = () => {
    setInput('');
    onBuscar(''); // Limpiar la búsqueda
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Buscar por descripción o ID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Buscar</button>
      {input && (
        <button type="button" onClick={handleClear}>
          Limpiar
        </button>
      )}
    </form>
  );
};

export default SearchBar;