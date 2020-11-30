// Represents a list of results objects, which will need to be displayed
// Takes in a list of parameters to be given to the results
import '../assets/css/Results.css';
import React, { Component } from 'react';
import Result from "./Result.js"

// Result Structure:
// {
//   "frequency": integer,
//   "suffix": string,
//   "definitions": [string],
//   "word": string
// }

class Results extends React.Component {
  render() {
    console.log(this.props.results);
    return (
      <div className='flex-container'>
        {this.props.results.map(function(result) {
          return <Result
                   word={result.word}
                   definitions={result.definitions}
                   kanji={result.kanji}
                   kana={result.kana}
                   language={result.language}
                 />
        })}
      </div>
    );
  }
}

export default Results;
