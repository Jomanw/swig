import '../assets/css/App.css';
import React, { Component } from 'react';
import SearchBar from "./SearchBar.js";
import SearchForm from "./SearchForm.js";
var {ipcRenderer} = require("electron");

class App extends React.Component {

  constructor(props) {
    super(props);
    this.height = 0;
    this.getHeight = this.getHeight.bind(this);
  }

  getHeight() {
    return this.refs.AppContainer.clientHeight;
  }

  render() {
    return (
      <div
        ref={"AppContainer"}
      >
        <SearchForm
          dict={this.props.dict}
          dictEnglish={this.props.dictEnglish}
          getHeight={this.getHeight}
        />
      </div>
    );
  }
}

export default App;
