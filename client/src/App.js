import React, { Fragment, useEffect } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import SelectStoreModal from './components/logs/SelectStoreModal';
import { Provider } from 'react-redux';
import stores from './stores';


import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css'


const App = () => {
  useEffect(() => {
    // Here's where we initialize materialize css
    M.AutoInit();
  });
  return (
    <Provider store={stores}>
      <Fragment>
        <SearchBar />
        <div className="container">
          <AddBtn />
          <SelectStoreModal />
          <Logs />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;