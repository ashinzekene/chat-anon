import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  componentWillReceiveProps(nextProps) {
    let { history } = nextProps
    let { pathname } = history.location
    console.log("NEXT PROPS", pathname)
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
    let menu
    let { path } = this.state
    if (this.props.header.back) {
      menu = <Icon size="large" onClick={ this.goBack } className="header-back-icon" name="arrow left" />
    } else {
      menu =
        <Icon size="large" onClick={ this.toggleSidebar } className="header-back-icon" name="sidebar" />
    }
    return (
      <h2 style={ style } >
        { menu }
        { this.props.header.title }
        { path && <Link style={{ color: "rgba(0,0,0,.87)" }} to={ path }>
          <Icon size="large" style={{ float: "right" }} name="add" />
        </Link> }
      </h2>
    )
  }
}

Header.propTypes = {
  header: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
}

const style = {
  "textAlign": "center",
  "padding": "20px 10px",
  "margin": "10px",
  "position": "relative",
}

export default Header