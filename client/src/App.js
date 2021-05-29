
import React, { Component } from 'react'
import './App.css';
import ButtonAppBar from './components/Header'
import Results from './components/Cards'
import MyButton from './components/Footer'
import SearchField from "react-search-field";
import Search from "./components/Search"


class App extends Component {
  render() {
    return (
      < MyButton />,
      < Search />
    );
  }
}
export default App;
