import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route exact {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect preserveQueryString  to={{
          pathname: "/",
          state: { from: props.location }
        }} />
  )} />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

export default PrivateRoute;