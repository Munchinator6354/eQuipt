import React, {useState, useContext} from 'react'
import {LoggedInContext} from '../../LoggedInContext'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

export default function ProtectedRoute({component: Component,loggedIn: LoggedIn, ...rest }) {
  const value = useContext(LoggedInContext)
  return (
    <div>
    <Route {...rest} render={(props) => (
        value === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
    </div>
  )
}




  