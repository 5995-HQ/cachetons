import React, { useEffect, useState } from 'react';
import Logs from './components/stores/Logs';
import SelectAndSearchStore from './components/stores/SelectAndSearchStore';
import Header from './components/Header';

import './App.css'

const App = () => {

  const [storefront, setStorefront] = useState("ebay")
  const [subject, setSubject] = useState("")

  const sendSearch = (store, search) => {
    setStorefront(store)
    setSubject(search)
  }

  return (
    <div>
      <div>
        <div className="font-sans md:font-serif toppart pr-10 text-2xl">Search through some of your favorite user to user marketplaces</div>
        <div className="font-sans md:font-serif side mt-8 text-4xl">Cachetons</div>
        </div >
      <div className="px-10 pt-10 pb-20 relative flex items-center space-x-5">
        <SelectAndSearchStore sendSearch={(store, search) => sendSearch(store, search)} />
      </div>
      <Logs storefront={storefront} subject={subject} />
      </div>
  );
};

export default App;