import React, { Component } from 'react';
import { Button, Icon } from "semantic-ui-react";
import Header from './header.jsx';
import Tab from './tab.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <Header title="ChatAnon" />
        <Button icon={<Icon name="search" />} content="Hello" />
        <p>
          To not get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Tab/>
      </div>
    );
  }
}

export default App;
