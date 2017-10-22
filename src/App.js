import React, { Component } from 'react';
import logo from './logo.svg';
import { Button, Icon } from "semantic-ui-react";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button icon={<Icon name="search" />} content="Hello" />
        <p className="App-intro">
          To not get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
