import React, { Component } from 'react';
import Mobile from './Mobile';
import LargeScreen from './LargeScreen';
import { SIDEBAR_TOGGLE, LOGOUT } from '../actions';
import { connect } from "react-redux";

export const isLargeScreen = () => window.matchMedia("(min-width: 769px)").matches

const mapStateToProps = state => ({
  header: state.common.header,
  currentUser: state.currentUser,
  sidebarVisible: state.common.sidebarVisible
})

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch({ type: SIDEBAR_TOGGLE }),
  logOut: () => dispatch({ type: LOGOUT }),
})

class App extends Component {
  state = {}

  componentWillReceiveProps(nextProp) {
    if (nextProp.redirectTo) {
      this.props.history.push(nextProp.redirectTo)
      this.props.onRedirect()
    }
  }

  render() {
    return (
      isLargeScreen() ?
        <LargeScreen
          logOut={this.props.logOut}
          toggleSidebar={this.props.toggleSidebar}
          header={this.props.header}
          currentUser={this.props.currentUser}
          sidebarVisible={this.props.sidebarVisible}
          history={this.props.history}
        /> :
        <Mobile
          logOut={this.props.logOut}
          toggleSidebar={this.props.toggleSidebar}
          header={this.props.header}
          currentUser={this.props.currentUser}
          sidebarVisible={this.props.sidebarVisible}
          history={this.props.history}
        />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);