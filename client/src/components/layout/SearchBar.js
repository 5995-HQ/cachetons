import React, { useState } from 'react';
import '../../App.css'
const SearchBar = ({ onSelect, onSearch }) => {
  const [store, setStore] = useState()
  const [search, setSearch] = useState()
  function handleSubmit() { (onSelect(store), onSearch(search)) }
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="search_bar">
          <input id="search" type="search" value={(store, search)} onChange={r => setStore(r.target.value), r => setSearch(r.target.value)} />
        </div>
      </form>
    </div>
  )
}

export default SearchBar