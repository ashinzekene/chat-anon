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
import CreateCircle from './CreateCircle';
import CreatePoll from './CreatePoll';
import PollList from './PollList';
import CircleList from './CircleList';
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
      <Sidebar.Pusher style={{ height: "-webkit-fill-available" }}>
        <Header history={ props.history } toggleSidebar= { props.toggleSidebar } header={ props.header } />
        <Switch>
          <Route path="/circle/:id" component={ Circle } />
          <Route path="/poll/:id" component={ Poll } />
          <Route path="/circles" component={ CircleList } />
          <Route path="/polls" component={ PollList } />
          <Route path="/circle" component={ Profile } />
          <Route path="/profile" component={ Profile } />
          <Route path="/login" component={ Auth } />
          <Route path="/signup" component={ Auth } />
          <Route path="/create/circles" component={ CreateCircle } />
          <Route path="/create/polls" component={ CreatePoll } />
          <Route path="/" render={() => <Home /> } />
        </Switch>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
