import React from 'react'
import {
  BrowserRouter as Router,  
  Route,
  Redirect
} from 'react-router-dom'
import {useSelector} from 'react-redux';


export default function ProtectedRoute({component: Component,loggedIn: LoggedIn, ...rest }) {

  const loggedInState = useSelector(state => state.isLogged)
 
  return (
    <div>
    <Router>
    <Route {...rest} render={(props) => (
        loggedInState === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
    </Router>
    </div>
  )
}




  