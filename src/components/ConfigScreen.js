import '../assets/css/ConfigScreen.css';
import React, { Component } from 'react';
import InputLanguage  from "./InputLanguage.js";
// import OutputLanguage  from "./OutputLanguage.js";

var {ipcRenderer} = require("electron");

class ConfigScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <InputLanguage/>
      </div>
    );
  }
}

export default ConfigScreen;
