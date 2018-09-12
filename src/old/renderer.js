// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var events = require('events');
var {ipcRenderer} = require("electron")
var eventEmitter = new events.EventEmitter();
var count = 0
var internalString = ""
var currentString = ""
const fs = require("fs")
var trieDict = require("./jmdictParser.js").trieDict

class Dictionary {
  constructor(xmlDictionary) {
    this.dict = xmlDictionary
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function formatResultsIntoHtml(results, prefix) {
  if (results.length == 0) {
    return "No Results Found (:<{}"
  } else {
    return results.map(function(result) {
      return "<b>" + prefix + result.word + "</b>" + ": " + result.definitions.join(", ").substring(0,50)
    }).join("<br>")
  }
}

function handleKeyDown() {
  var code = event.keyCode || event.charCode
  if (keysToIgnore.has(code)) {
    return
  }
  prefix = document.getElementById("mainInput").value
  count += 1

  // Read the string inside the textbox
  if (isBackspace(event)) {
    currentString = prefix.slice(0, -1)
  } else {
    currentString = prefix + event.key
  }
  // console.log(currentString)
  var match = trieDict.find(currentString)
  if (match) {
    // console.log("omg whattt")
    // document.getElementById("topResult").innerHTML = "<b>" + match.word + ": " match.definitions.join(", ") + "</b>"
    document.getElementById("topResult").innerHTML = formatResultsIntoHtml([{
      word: currentString,
      definitions: match.definitions,
    }], "")
  } else {
    document.getElementById("topResult").innerHTML = null
  }
  var results = trieDict.autocomplete(currentString)
  if (results.length == 0) {
    document.getElementById("results").innerHTML = "No Results Found (:<{}"
  } else {
    document.getElementById("results").innerHTML = formatResultsIntoHtml(results, currentString)
  }

  // TODO: need to use react for this, or it would at least be super helpful
  // Search the trie DS for results starting with that, with the top result being an exact match, if it exists
  // results = search(currentString)
}

ipcRenderer.on("focused", function() {
  document.getElementById("mainInput").focus();
})

function search() {
  // TODO: autocomplete
}

function isBackspace(event) {
  return event.keyCode == 8
}


keysToIgnore = new Set([9, 16, 17, 18, 20, 27, 37, 38, 39, 40, 13, 91, 93])

// Load and parse the dictionary
// Define the trie data structure here
// Insert the dictionary into the trie

module.exports.handleKeyDown = handleKeyDown
