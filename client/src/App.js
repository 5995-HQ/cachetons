import React, { Fragment, useEffect, useState } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import SelectStoreModal from './components/logs/SelectStoreModal';
import Header from './components/Header';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css'


const App = () => {

  const [storefront, setStorefront] = useState("craigslist")
  const [subject, setSubject] = useState("")
  useEffect(() => {
    // Here's where we initialize materialize css
    M.AutoInit();
  });
  return (
    <div className="display: flex; justify-content: flex-end">
      <div className="row">
        <Fragment>
          <Header storefront={storefront} subject={subject} />
          <SearchBar storefront={storefront} subject={subject} onSearch={(newSubject) => setSubject(newSubject)} />
          <SelectStoreModal onSelect={(newStoreSelect) => setStorefront(newStoreSelect)} />
          <Logs storefront={storefront} subject={subject} />
        </Fragment>
      </div >
    </div >
  );
};

export default App;