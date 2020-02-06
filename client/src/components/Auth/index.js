import React from 'react';
import {
    BrowserRouter as Route,
    Redirect,
  } from 'react-router-dom';
  


  export default function PrivateRoute({ component: Component, ...rest }) {
    const authed=false;  
    return (
        <Route {...rest} render={(props) => (
          authed === true
            ? <Component {...props} />
            : <Redirect exact to='/login' />
        )} />
      )
  }
  