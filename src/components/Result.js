import '../assets/css/Result.css';
import React, { Component } from 'react';


class Result extends React.Component {
  render() {
    return (
      <div className="result">
      <span className="word">
        {this.props.word}:&nbsp;
      </span>
      <span className="kanji">
        ({this.props.kanji}
      </span>
      <span className="kana">
      {
        this.props.kanji === this.props.kana ?
        (
          null
        ) : (
          ", " + this.props.kana
        )
      })&nbsp;
      </span>
      <span className="definitions">
        {this.props.definitions.join('; ')}
      </span>
      </div>
    );
  }
}

export default Result;
