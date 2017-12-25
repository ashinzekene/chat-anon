import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Sidebar, Segment } from "semantic-ui-react";

import MyHeader from './MyHeader';
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
import {
  CIRCLE_LIST_LOADED,
  CIRCLE_CREATED,
  POLL_LIST_LOADED,
  SIDEBAR_TOGGLE,
  CHANGE_HEADER,
  LOGIN,
  SIGNUP,
  APP_LOAD,
  REDIRECT, 
  POLL_SELECTED,
  CIRCLE_SELECTED} from '../actions'
import agent from '../agent';

const mapStateToProps = state => ({
  polls: state.polls,
  circles: state.circles,
  currentUser: state.currentUser,
  user: state.user,
  redirectTo: state.common.redirectTo,
  header: state.common.header,
  sidebarVisible: state.common.sidebarVisible
})

const mapDispatchToProps = dispatch => ({
  createCircle: payload => dispatch({ type: CIRCLE_CREATED, payload }),
  selectPoll: poll => dispatch({ type: POLL_SELECTED, poll }),
  onSelect: circle => dispatch({ type: CIRCLE_SELECTED, circle }),
  onAppLoad: payload => dispatch({ type: APP_LOAD, payload }),
  onLogin: payload => dispatch({ type: LOGIN, payload }),
  onSignup: payload => dispatch({ type: SIGNUP, payload }),
  onCircleLoad: payload => () => dispatch({ type: CIRCLE_LIST_LOADED, payload }),
  onPollLoad: payload => () => dispatch({ type: POLL_LIST_LOADED, payload }),
  changeHeader: header => dispatch({ type: CHANGE_HEADER, header }),  
  toggleSidebar: () => dispatch({ type: SIDEBAR_TOGGLE }),
  onRedirect: () => dispatch({ type: REDIRECT })
})

class App extends Component {
  componentWillMount() {
    const token = localStorage.getItem('jwt')
    if (token) agent.setToken(token)
    this.props.onAppLoad(agent.User.get())
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.redirectTo) {
      this.props.history.push(nextProp.redirectTo)
      this.props.onRedirect()
    }
  }
  onLogin = body => {
    this.props.onLogin(agent.User.login(body))
  }
  onSignup = body => {
    this.props.onSignup(agent.User.signup(body))
  }
  onProfileLoad = () => {
    this.props.onProfileLoad(agent.User.getSelf())
  }
  createCircle = circle => {
    this.props.createCircle(agent.Circle.create(circle))
  }

  selectPoll = poll => {
    this.props.selectPoll(poll)
  }
  
  selectCircle = circle => {
    this.props.selectCircle(circle)
  }
  
  render() {
    return (
      <div>
        <Sidebar.Pushable style={{ height: "100vh" }} as={Segment}>
          <MySidebar currentUser={ this.props.currentUser } visible={ this.props.sidebarVisible } />
          <Sidebar.Pusher className="full-height">
            <MyHeader history={ this.props.history } toggleSidebar= { this.props.toggleSidebar } header={ this.props.header } />
            <Switch>
              <Route path="/circle/:id" render={ props => <Circle { ...props } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/poll/:id" render={ props => <Poll { ...props } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/create/circles" render={ props => <CreateCircle { ...props } createCircle={ this.createCircle } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/create/polls" render={ props => <CreatePoll { ...props } changeHeader={ this.props.changeHeader }/> } />
              <Route path="/circles" render={ props => <CircleList {...props} circles={ this.props.circles } selectCircle={ this.selectCircle } onLoad={ this.props.onCircleLoad(agent.Circle._getAll()) } /> } />
              <Route path="/polls" render={ props => <PollList {...props} polls={ this.props.polls } selectPoll={ this.selectPoll } onLoad={ this.props.onPollLoad(agent.Poll._getAll()) } /> } />
              <Route path="/login" render={ props => <Login {...props} onLogin={ this.onLogin } /> } />
              <Route path="/signup" render={ props => <Signup {...props} signUp={ this.onSignup } /> } />
              <Route path="/profile" render={ props => <Profile {...props} /> } />
              <Route path="/" render={ props => <Home { ...props } /> } />
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div> 
    ) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
