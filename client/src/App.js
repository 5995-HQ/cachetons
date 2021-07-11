import React, { Fragment, useEffect, useState } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
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
    <div className="container">
      <Fragment>
        <Header storefront={storefront} subject={subject} />
        <SearchBar onSearch={(newSubject) => setSubject(newSubject)} />
        <div>
          <SelectStoreModal onSelect={(newStoreSelect) => setStorefront(newStoreSelect)} />
          <Logs storefront={storefront} subject={subject} />
          <AddBtn />
        </div>
      </Fragment>
    </div>
  );
};

export default App;