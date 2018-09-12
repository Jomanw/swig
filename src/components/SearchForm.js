// import '../assets/css/App.css';
import React, { Component } from 'react';
var {ipcRenderer} = require('electron');
import SearchBar from "./SearchBar.js";
import Results from "./Results.js";
var wanakana = require('wanakana');
// var converter = require('jp-conversion');


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentString: "",
    };
    this.currentResults = [];
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  componentDidUpdate() {
    ipcRenderer.send("resize", this.props.getHeight());
  }

  searchForWords(searchTerm) {
    if (searchTerm == "")  {
      return [];
      // console.log("Got HEREEE");
      // console.log(this.currentResults);
    } else {
      if (true) {
        return this.props.dict.autocomplete(searchTerm.toLowerCase());
      } else {
        console.log(wanakana.toRomaji(searchTerm))
        return this.props.dict.autocomplete(searchTerm.toLowerCase());
      }
      // return this.props.dict.autocomplete(searchTerm.toLowerCase());
    }
  }

  handleSearchInputChange(e) {
    this.setState({currentString: e.target.value}, function() {
      if (this.state.currentString == "")  {
        this.currentResults = [];
        // console.log("Got HEREEE");
        // console.log(this.currentResults);
      } else {
        if (true) {
          this.currentResults = this.props.dict.autocomplete(this.state.currentString.toLowerCase());
        } else {
          this.currentResults = this.props.dict.autocomplete(this.state.currentString.toLowerCase());
        }
      }
    })
  };
  render() {
    return (
      <div>
        <SearchBar
          onChange={this.handleSearchInputChange}
          value={this.state.currentString}
        />
        <Results
          results={this.searchForWords(this.state.currentString)}

        />
      </div>
    );
  }
}

export default SearchForm;
