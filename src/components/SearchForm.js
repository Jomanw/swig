import '../assets/css/SearchForm.css';
import React, { Component } from 'react';
var {ipcRenderer} = require('electron');
import SearchBar from "./SearchBar.js";
import ConfigScreen from "./ConfigScreen.js";
import Results from "./Results.js";
var wanakana = require('wanakana');
// var converter = require('jp-conversion');

const mode = 'japanese';

// const inlineStyle = {
//   float: 'right',
// };

const inlineDisplay = {
  display: 'inline-block',
};

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
        if (mode == 'english') {
          return this.props.dictEnglish.autocomplete(searchTerm.toLowerCase(),10);
        } else {
          return this.props.dict.autocomplete(searchTerm.toLowerCase(), 10);
        }
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
      } else {
        this.currentResults = this.props.dict.autocomplete(this.state.currentString.toLowerCase());
      }
    })
  };
  render() {
    return (
      <div>
        <div className="search-bar">
          <SearchBar style="display"
            onChange={this.handleSearchInputChange}
            value={this.state.currentString}
          />
        </div>
        <div className="settings-console">
          Settings
          <ConfigScreen/>
        </div>
        <Results
          results={this.searchForWords(this.state.currentString)}

        />
      </div>
    );
  }
}

export default SearchForm;
