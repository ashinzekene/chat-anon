import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const Header = props => (
  <h2 style={ style } >
    { props.header.back && <Link style={{ color: "black" }} to="/"><Icon className="header-back-icon" float="left" name="arrow left" /></Link> }
    { props.header.title }
  </h2>
)

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