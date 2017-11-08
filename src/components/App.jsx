import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home.jsx';
import Circle from './Circle'
import Poll from './Poll'
import Profile from './Profile';
import { CHANGE_TAB } from '../actions/actionTypes'


const mapStateToProps = state => ({
  header: state.common.header,
  activeTab: state.common.activeIndex
})

const mapDispatchToProps = dispatch => ({
  handleTabChange: (e, { activeIndex }) => () => dispatch({ type: CHANGE_TAB, activeIndex }),
})

const App = props => (
  <div>
    <Header history={ props.history } header={ props.header } />
    <Switch>
      <Route path="/circle/:id" component={ Circle } />
      <Route path="/poll/:id" component={ Poll } />
      <Route path="/profile" component={ Profile } />
      <Route path="/" render={() => <Home handleTabChange={ props.handleTabChange } /> } />
    </Switch>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
