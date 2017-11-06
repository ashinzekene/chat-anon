import React from 'react';
import { Icon } from 'semantic-ui-react';
import propTypes from 'prop-types';

const Header = props => (
  <h2 style={ style } >
    { props.header.back && <Icon float="left" name="arrow left" /> }
    { props.header.title }
  </h2>
)

Header.propTypes = {
  header: propTypes.object.isRequired,
}

const style = {
  "textAlign": "center",
  "padding": "20px 10px",
  "margin": "10px",
}

export default Header