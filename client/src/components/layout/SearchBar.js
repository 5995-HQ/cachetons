import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState()
  function handleSubmit() { onSearch(search) }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input id="search" type="search" value={search} onChange={r => setSearch(r.target.value)} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md" />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar