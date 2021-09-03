import React, { useState } from 'react';
import Logs from './components/stores/Logs';
import SelectAndSearchStore from './components/stores/SelectAndSearchStore';
import Header from './components/Header';
import background from './assets/colorfulbackground.png';

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
    <div style={{ backgroundImage: `url(${background})` }}>
     <div className="fixed-header">
      <Header />
      <div className="px-10 pt-10 pb-20 relative flex items-center space-x-5">
            <SelectAndSearchStore sendSearch={(store, search) => sendSearch(store, search)} />
        </div>
        </div>
        <div>
        </div>
      </div>
      <Logs storefront={storefront} subject={subject} />
    </div >
  );
};

export default App;