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
      menu = <Icon size="large" onClick={ this.goBack } name="arrow left" />
    } else {
      menu =
        <Icon size="large" onClick={ this.toggleSidebar } name="sidebar" />
    }
    return (
      <h2 style={ style } >
        { menu }
        <div style={{ padding: "5px 30px" }}>
          { this.props.header.title }
        </div>
        <div>
        { path && <Link style={{ color: "rgba(0,0,0,.87)" }} to={ path }>
          <Icon size="large" name="add" />
        </Link> }
        </div>
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
  "display": "flex",
  "justifyContent": "space-between",
  "position": "relative",
}

export default Header