import React from 'react';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home.jsx';
import Circle from './Circle.jsx'
import Poll from './Poll.jsx'
import Profile from './Profile.jsx';

// import agent from '../agent';
// import { APP_LOAD, REDIRECT } from '../actions/actionTypes';
// import { store } from '../store';

const App = props => (
  <div>
    <Header title="Chat Anon" />
    <Switch>
      <Route path="/circle/:id" component={ Circle } />
      <Route path="/poll/:id" component={ Poll } />
      <Route path="/profile" component={ Profile } />
      <Route path="/" component={ Home } />
    </Switch>
  </div>
)

export default App