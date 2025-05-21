import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    onSearch(value)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por descripción o ID..."
        value={searchInput}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar