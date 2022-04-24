import React, { useEffect, useState } from 'react';
import Logs from './components/stores/Logs';
import SelectAndSearchStore from './components/stores/SelectAndSearchStore';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css'

const App = () => {

  const [storefront, setStorefront] = useState("craigslist")
  const [subject, setSubject] = useState()

  const sendSearch = (store, search) => {
    setStorefront(store)
    setSubject(search)
  }

  return (
    <div>
     <Header className="header"/>
      
      <div className="pb-20">
        <SelectAndSearchStore sendSearch={(store, search) => sendSearch(store, search)} />
        <div>
        </div>
      </div>
      
      <Logs storefront={storefront} subject={subject} />
      <Footer className="footer"/>
    </div >
  );
};

export default App;