import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

import Home from './Home.jsx';
import Circle from './Circle'
import Poll from './Poll'
import Signup from './Signup';
import Login from './Login';
import CreateCircle from './CreateCircle/index';
import CreatePoll from './CreatePoll';
import PollList from './PollList';
import CircleList from './CircleList';
import Settings from './Settings';
import Profile from './Profile';
import Explore from './Explore';
import ConditionalRoute from '../containers/ConditionalRoute';
import Add from './Circle/Add';
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
  CIRCLE_SELECTED,
  LOGOUT,
  REMOVE_AUTH_ERROR
} from '../actions'
import agent from '../agent';

const mapStateToProps = state => ({
  authErrors: state.auth.errors,
  polls: state.polls,
  circles: state.circles,
  circle: state.circle,
  currentUser: state.currentUser,
  user: state.user,
  users: state.users,
  redirectTo: state.common.redirectTo,
  header: state.common.header,
  sidebarVisible: state.common.sidebarVisible
})

const mapDispatchToProps = dispatch => ({
  createCircle: payload => dispatch({ type: CIRCLE_CREATED, payload }),
  selectPoll: poll => dispatch({ type: POLL_SELECTED, poll }),
  selectCircle: circle => dispatch({ type: CIRCLE_SELECTED, circle }),
  onAppLoad: payload => dispatch({ type: APP_LOAD, payload }),
  onLogin: payload => dispatch({ type: LOGIN, payload }),
  onSignup: payload => dispatch({ type: SIGNUP, payload }),
  onCircleLoad: payload => () => dispatch({ type: CIRCLE_LIST_LOADED, payload }),
  onPollLoad: payload => () => dispatch({ type: POLL_LIST_LOADED, payload }),
  changeHeader: header => dispatch({ type: CHANGE_HEADER, header }),
  toggleSidebar: () => dispatch({ type: SIDEBAR_TOGGLE }),
  logOut: () => dispatch({ type: LOGOUT }),
  onRedirect: () => dispatch({ type: REDIRECT }),
  removeAuthError: key => () => dispatch({ type: REMOVE_AUTH_ERROR, key })
})

class Main extends Component {
  componentWillMount() {
    const token = localStorage.getItem('jwt')
    if (token) agent.setToken(token)
    this.props.onAppLoad(agent.User.getMe())
  }
  componentWillReceiveProps() {
    this.forceUpdate()
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
        <div style={{ paddingTop: "15px" }}></div>
        <Switch>
          <ConditionalRoute path="/circle/:id/add-fellow" type="fellow"
            shouldRender={!!this.props.circle.fellows}
            redirect="/circles" component={Add} />
          <ConditionalRoute path="/circle/:id/add-admin" type="admin"
            shouldRender={!!this.props.circle.fellows}
            redirect="/circles" component={Add} />
          <Route path="/circle/:id" render={props => <Circle {...props} changeHeader={this.props.changeHeader} />} />
          <Route path="/poll/:id" render={props => <Poll {...props} changeHeader={this.props.changeHeader} />} />
          <Route path="/create/circles"
            render={props => (
              <CreateCircle {...props} createCircle={this.createCircle} changeHeader={this.props.changeHeader} />
            )} />
          <Route path="/create/polls" render={props => <CreatePoll {...props} changeHeader={this.props.changeHeader} />} />
          <Route path="/circles" render={props => <CircleList
            {...props}
            changeHeader={this.props.changeHeader}
            circles={this.props.circles}
            selectCircle={this.selectCircle}
            onLoad={this.props.onCircleLoad(agent.Circle.getAll())} />} />
          <Route path="/polls" render={props => <PollList
            {...props}
            changeHeader={this.props.changeHeader}
            polls={this.props.polls}
            selectPoll={this.selectPoll}
            onLoad={this.props.onPollLoad(agent.Poll.getAll())} />} />
          <Route path="/login" render={props => <Login
            removeAuthError={this.props.removeAuthError} {...props}
            errors={this.props.authErrors}
            onLogin={this.onLogin} />} />
          <Route path="/settings" render={props => (
            <Settings removeAuthError={this.props.removeAuthError} {...props} currentUser={this.props.currentUser} />
          )} />
          <Route path="/signup" render={props => (
            <Signup {...props} removeAuthError={this.props.removeAuthError} rrors={this.props.authErrors} signUp={this.onSignup} />
          )} />
          <Route path="/explore" render={props => <Explore {...props} />} />
          <Route path="/@:id" render={props => <Profile {...props} />} />
          <Route path="/" render={props => <Home {...props} />} />
        </Switch>
      </div>
    )
  }
}

Main.propTypes = {
  polls: PropTypes.array,
  circles: PropTypes.array,
  circle: PropTypes.object,
  currentUser: PropTypes.object,
  user: PropTypes.object,
  users: PropTypes.array,
  redirectTo: PropTypes.string,
  header: PropTypes.shape({
    title: PropTypes.string,
    back: PropTypes.bool,
  }),
  sidebarVisible: PropTypes.bool,
  createCircle: PropTypes.func.isRequired,
  selectPoll: PropTypes.func.isRequired,
  selectCircle: PropTypes.func.isRequired,
  onAppLoad: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
  onCircleLoad: PropTypes.func.isRequired,
  onPollLoad: PropTypes.func.isRequired,
  changeHeader: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));