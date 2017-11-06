import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home.jsx';
import Circle from './Circle'
import Poll from './Poll'
import Profile from './Profile';

const mapStateToProps = state => ({
  header: state.common.header
})

const App = props => (
  <div>
    <Header title={ props.header } />
    <Switch>
      <Route path="/circle/:id" component={ Circle } />
      <Route path="/poll/:id" component={ Poll } />
      <Route path="/profile" component={ Profile } />
      <Route path="/" component={ Home } />
    </Switch>
  </div>
)

export default connect(mapStateToProps)(App);
