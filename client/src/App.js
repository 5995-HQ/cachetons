import React, { useEffect, useState } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/stores/Logs';
import SelectStore from './components/stores/SelectStore';
import Header from './components/Header';

import './App.css'

const App = () => {

  const [storefront, setStorefront] = useState("craigslist")
  const [subject, setSubject] = useState()

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="px-10 pt-10 pb-20 relative flex items-center space-x-5">
        <SearchBar onSearch={(newSubject) => setSubject(newSubject)} />

        <SelectStore onSelect={(newStoreSelect) => setStorefront(newStoreSelect)} />
        <div>
        </div>
      </div>
      <Logs storefront={storefront} subject={subject} />
    </div >
  );
};

export default App;