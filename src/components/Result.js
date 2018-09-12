import '../assets/css/Result.css';
import React, { Component } from 'react';


class Result extends React.Component {
  render() {
    return (
      <div class="result">
      <span class="word">
        {this.props.word}:&nbsp;
      </span>
      <span class="kanji">
        ({this.props.kanji}
      </span>
      <span class="kana">
      {
        this.props.kanji === this.props.kana ?
        (
          null
        ) : (
          ", " + this.props.kana
        )
      })&nbsp;
      </span>
      <span class="definitions">
        {this.props.definitions.join('; ')}
      </span>
      </div>
    );
  }
}

export default Result;
