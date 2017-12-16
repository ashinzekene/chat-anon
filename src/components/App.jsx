import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Sidebar, Segment } from "semantic-ui-react";

import Header from './Header';
import MySidebar from './MySidebar';
import Home from './Home.jsx';
import Circle from './Circle'
import Poll from './Poll'
import Profile from './Profile';
import Auth from './Auth';
import { SIDEBAR_TOGGLE } from '../actions/actionTypes'


const mapStateToProps = state => ({
  header: state.common.header,
  sidebarVisible: state.common.sidebarVisible
})

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch({ type: SIDEBAR_TOGGLE })
})

const App = props => (
  <div>
    <Sidebar.Pushable style={{ minHeight: "100vh" }} as={Segment}>
      <MySidebar visible={ props.sidebarVisible } />
      <Sidebar.Pusher>
        <Header history={ props.history } toggleSidebar= { props.toggleSidebar } header={ props.header } />
        <Switch>
          <Route path="/circle/:id" component={ Circle } />
          <Route path="/poll/:id" component={ Poll } />
          <Route path="/profile" component={ Profile } />
          <Route path="/login" component={ Auth } />
          <Route path="/signup" component={ Auth } />
          <Route path="/" render={() => <Home /> } />
        </Switch>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
