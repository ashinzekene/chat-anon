import React from 'react';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import Header from './Header';
import Home from './Home.jsx';

// import agent from '../agent';
// import { APP_LOAD, REDIRECT } from '../actions/actionTypes';
// import { store } from '../store';
// import Profile from '../Profile.jsx';

const App = props => (
  <div>
    <Header title="Chat Anon" />
    <Home />
  </div>
)

export default App