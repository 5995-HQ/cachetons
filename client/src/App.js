import React, { Fragment, useEffect, useState } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import SelectStoreModal from './components/logs/SelectStoreModal';
import Header from './components/Header';
import SideNav from './components/layout/SideNav';
import { SideBarFancy } from './components/layout/SideBarFancy';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css'


const App = () => {

  const [store, setStorefront] = useState("Ebay")
  const [subject, setSubject] = useState("")
  const [option, setOption] = useState("")
  useEffect(() => {
    // Here's where we initialize materialize css
    M.AutoInit();
  });
  return (

    <div className="container">
      < Header />
      <SelectStoreModal />
      <SearchBar store={store} onSelect={(newStoreSelect) => setStorefront(newStoreSelect)} onSearch={(newSubject) => setSubject(newSubject)} />
      < SideNav />
      <Logs store={store} subject={subject} />
    </div >

  );
};

export default App;