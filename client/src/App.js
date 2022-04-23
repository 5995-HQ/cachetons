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
    <div className='backgroundthing'>
      <div>
        <div className="font-sans md:font-serif side mt-8 text-4xl">Cachetons</div>
        <div>
          <SelectAndSearchStore sendSearch={(store, search) => sendSearch(store, search)} />
        </div>
        </div >
      <Logs storefront={storefront} subject={subject} />
      </div>
  );
};

export default App;