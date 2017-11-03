import React from 'react';
import propTypes from 'prop-types';

const Header = props => (
  <h2 style={ style } >
    { props.title }
  </h2>
)

Header.propTypes = {
  title: propTypes.string.isRequired
}

const style = {
  "textAlign": "center",
  "padding": "20px 10px",
}

export default Header