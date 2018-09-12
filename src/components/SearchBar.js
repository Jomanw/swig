import '../assets/css/SearchBar.css';
import React, { Component } from 'react';
import {ipcRenderer} from 'electron';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.focusListener = this.focusListener.bind(this);
  }

  focusListener() {
    this.refs.mainInput.focus();
  }

  componentDidMount() {
    ipcRenderer.on("focused", this.focusListener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("focused", this.focusListener);
  }

  render() {
    return (
      <div>
        <input type="text" id="mainInput" ref="mainInput"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}



export default SearchBar;
