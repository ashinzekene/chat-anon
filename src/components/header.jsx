import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const Header = props => {
  let menu
  if (props.header.back) {
    menu = 
      <Link style={{ color: "rgba(0,0,0,.87)" }} to="/">
        <Icon size="large" className="header-back-icon" float="left" name="arrow left" />
      </Link>
  } else {
    menu =
      <Icon size="large" onClick={ props.toggleSidebar } className="header-back-icon" float="left" name="sidebar" />
  }
  return (
    <h2 style={ style } >
      { menu }
      { props.header.title }
    </h2>
  )
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