import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HexToRgb from './HexToRgb';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Handy Tools</h2>
        </div>
        <p className="App-intro">
          This page was created using the create-react-app boilerplate.
        </p>
        <p className="App-intro">
            It is intended to reduce the amount of Googling things while developing.
        </p>
        <HexToRgb/>
        <p>Here's an inspirational video</p>
        <iframe src="https://player.vimeo.com/video/232485795" width="640" height="338" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </div>
    );
  }
}

export default App;
