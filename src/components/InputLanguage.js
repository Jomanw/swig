import '../assets/css/InputLanguage.css';
import React, { Component } from 'react';

var {ipcRenderer} = require("electron");

class InputLanguage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        InputLanguage!!
      </div>

    );
  }
}

export default InputLanguage;
