import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState()
  function handleSubmit() { onSearch(search) }
  return (
    < nav style={{ marginBottom: '30px' }
    } className="black" >
      <div className="nav-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input id="search" type="search" value={search} onChange={r => setSearch(r.target.value)} />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav >
  )
}

export default SearchBar