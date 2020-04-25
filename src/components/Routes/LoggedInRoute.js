
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    window.localStorage.user
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default LoggedInRoute;
