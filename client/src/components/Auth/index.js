import React from 'react'
// import Login from '../../pages/login'
import LoggedIn from '../LoggedInCheck';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import LoggedInCheck from '../LoggedInCheck';

const authed = true;

export default function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route {...rest} render={(props) => (
      LoggedInCheck.isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}




  