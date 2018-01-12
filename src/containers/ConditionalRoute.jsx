import React from 'react';
import propTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';

const ConditionalRoute = ({ redirect, shouldRender, component: Component, ...rest }) => {
  return (
    <Route { ...rest} render={ props =>
      shouldRender ?
      <Component {...props} {...rest}/>
      :
      <Redirect to={ redirect } />
    }/>
  )
}

ConditionalRoute.propTypes = {
  redirect: propTypes.string,
  shouldRender: propTypes.bool,
  component: propTypes.func
}

export default ConditionalRoute;