
import React, { Component } from 'react'
import './App.css';
import ButtonAppBar from './components/Header'
import Results from './components/Cards'
import MyButton from './components/Footer'
import SearchField from "react-search-field";



class App extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
        <Results />
      </div>
    );
  }
}
export default App;
