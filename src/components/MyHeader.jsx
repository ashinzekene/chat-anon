import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import propTypes from 'prop-types';
import { isLargeScreen } from './App';

class MyHeader extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  componentWillReceiveProps(nextProps) {
    let { history } = nextProps
    let { pathname } = history.location
    if (pathname === "/circles" || pathname === "/polls") {
      this.setState({ path: `/create${pathname}` })
    } else {
      this.setState({ path: "" })
    }
  }
  goBack = () => {
    this.props.history.goBack()
  }
  toggleSidebar = () => {
    this.props.toggleSidebar()
  }
  render() {
    let { path } = this.state
    return (
      <div>
        <h2 className="app-header" style={ style } >
          <LeftIcon
            header={ this.props.header }
            goBack={ this.goBack }
            toggleSidebar={ this.toggleSidebar }
            sidebarVisible={ this.props.sidebarVisible } />
          <Link to="/" style={{ color: "#333", padding: "5px 30px" }}>
            { this.props.header.title }
          </Link>
          <div>
            { path && <RightIcon currentUser={ this.props.currentUser } path={ path } /> }
          </div>
        </h2>
        <div style={{ height: "42px", width:"100%" }}></div>
      </div>
    )
  }
}

const LeftIcon = props => {
  let menu ="";
  if (isLargeScreen()) {
    menu = <div>&nbsp;</div>
  } else if (props.header.back) {
    menu = <Icon size="large" onClick={ props.goBack } name="arrow left" />
  } else if (props.sidebarVisible) {
    menu = <Icon size="large" onClick={ props.toggleSidebar } name="cancel" />
  } else {
    menu = <Icon size="large" onClick={ props.toggleSidebar } name="sidebar" />
  }
    return menu
}

const RightIcon = props => {
  if (props.currentUser && props.currentUser._id) {
    return (
      <Link style={{ color: "rgba(0,0,0,.87)" }} to={ props.path }>
        <Icon size="large" name="add" />
      </Link>
    )
  }
  return <div></div>
}

MyHeader.propTypes = {
  header: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
  sidebarVisible: propTypes.bool.isRequired,
}

const style = {
  "textAlign": "center",
  "padding": "15px 10px",
  "display": "flex",
  "justifyContent": "space-between",
  "position": "fixed",
  "width": "100%",
  "boxShadow": "1px 1px 12px 2px rgba(140, 140, 140, 0.25)",
  "top": "0",
  "backgroundColor": "white",
  "zIndex": "10000",
  "left": "0",
}

export default MyHeader