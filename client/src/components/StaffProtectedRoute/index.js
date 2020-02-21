import React from 'react'
import {
  BrowserRouter as Router,  
  Route,
  Redirect
} from 'react-router-dom'
import {useSelector} from 'react-redux';


export default function StaffProtectedRoute({component: Component,loggedIn: LoggedIn, ...rest }) {

  const loggedInState = useSelector(state => state.isLogged)
  const userInfo = useSelector(state => state.userInfo)
 
  return (
    <div>
    <Router>
    <Route {...rest} render={(props) => (
        (loggedInState === true && (userInfo.role === "Staff" || userInfo.role === "Admin"))
        ? <Component {...props} />
        : <Redirect to='/404' />
    )} />
    </Router>
    </div>
  )
}




  