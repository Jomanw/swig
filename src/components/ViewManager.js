import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './App.js';
// import App from './components/App';
var trieDict = require("../loadDict.js").trieDict;
var trieDictEnglish = require("../loadDict.js").trieDictEnglish;


import ConfigScreen from './ConfigScreen.js';

class ViewManager extends Component {

  static Views() {
    return {
      App: <App dict={trieDict} dictEnglish={trieDictEnglish}/>,
      ConfigScreen: <ConfigScreen/>
    }
  }

  static View(props) {
    let name = props.location.search.substr(1);
    console.log(name);
    console.log(props);
    let view = ViewManager.Views()[name];
    if(view == null)
      throw new Error("View '" + name + "' is undefined");
    return view;
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={ViewManager.View}/>
        </div>
      </Router>
    );
  }
}

export default ViewManager;
