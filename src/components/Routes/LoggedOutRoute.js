import React from 'react';
import { Route, useHistory } from 'react-router-dom';

const LoggedOutRoute = (props) => {
  return <Route {...props} />;
};

export default LoggedOutRoute;
