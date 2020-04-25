// @flow
import React, {  useEffect } from 'react';

import API from '../config/API';

const Logout = (props) => {

  const handleLogout = async () => {
    try {
      await API.post('/logout');
    } catch(e) {
      console.log(e);
    } finally {
      window.location.replace('/')
      window.localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;