import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Sidebar, Segment } from "semantic-ui-react";

import Header from './Header';
import MySidebar from './MySidebar';
import Home from './Home.jsx';
import Circle from './Circle'
import Poll from './Poll'
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';
import CreateCircle from './CreateCircle';
import CreatePoll from './CreatePoll';
import PollList from './PollList';
import CircleList from './CircleList';
import { SIDEBAR_TOGGLE, CHANGE_HEADER, LOGIN, SIGNUP, APP_LOAD, PROFILE_PAGE_LOADED } from '../actions/actionTypes'
import { POLL_LIST_LOADED } from '../actions/pollActions'
import { CIRCLE_LIST_LOADED } from '../actions/circleActions'
import agent from '../agent';

const mapStateToProps = state => ({
  user: state.user,
  header: state.common.header,
  sidebarVisible: state.common.sidebarVisible
})

const mapDispatchToProps = dispatch => ({
  onProfileLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onAppLoad: () => dispatch({ type: APP_LOAD }),
  onLogin: payload => dispatch({ type: LOGIN, payload }),
  onSignup: payload => dispatch({ type: SIGNUP, payload }),
  onCircleLoad: payload => () => dispatch({ type: CIRCLE_LIST_LOADED, payload }),
  onPollLoad: payload => () => dispatch({ type: POLL_LIST_LOADED, payload }),
  changeHeader: header => dispatch({ type: CHANGE_HEADER, header }),  
  toggleSidebar: () => dispatch({ type: SIDEBAR_TOGGLE })
})

class App extends Component {
  componentWillMount() {
    this.props.onAppLoad()
  }
  onLogin = (body) => {
    this.props.onLogin(agent.User.login(body))
  }
  onSignup = (body) => {
    this.props.onSignup(agent.User.signup(body))
  }
  onProfileLoad = () => {
    this.props.onProfileLoad(agent.User.getSelf())
  }
  render() {
    return (
      <div>
        <Sidebar.Pushable style={{ minHeight: "100vh" }} as={Segment}>
          <MySidebar visible={ this.props.sidebarVisible } />
          <Sidebar.Pusher style={{ height: "-webkit-fill-available", overflow: "auto" }}>
            <Header history={ this.props.history } toggleSidebar= { this.props.toggleSidebar } header={ this.props.header } />
            <Switch>
              <Route path="/circle/:id" render={ props => <Circle { ...props } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/poll/:id" render={ props => <Poll { ...props } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/create/circles" render={ props => <CreateCircle { ...props } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/create/polls" render={ props => <CreatePoll { ...props } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/circles" render={ props => <CircleList {...props} onLoad={ this.props.onCircleLoad(agent.Circle._getAll()) } /> } />
              <Route path="/polls" render={ props => <PollList {...props} onLoad={ this.props.onPollLoad(agent.Poll._getAll()) } /> } />
              <Route path="/login" render={ props => <Login {...props} onLogin={ this.onLogin } /> } />
              <Route path="/signup" render={ props => <Signup {...props} onSignup={ this.onSignup } /> } />
              <Route path="/profile" render={ props => <Profile {...props} onLoad={ this.onProfileLoad } user={ this.props.user } /> } />
              <Route path="/" render={ props => <Home { ...props } /> } />
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div> 
    ) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
