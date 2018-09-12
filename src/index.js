import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
var trieDict = require("./loadDict.js").trieDict

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );

//TODO: make it so this doesn't import the dictionary at this top level,
// And instead imports it in one of the children

// Now we can render our application into it
render( <App dict={trieDict}/>, document.getElementById('root') );
