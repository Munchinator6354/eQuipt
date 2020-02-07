import React from 'react';
import Nav from './components/Nav';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from 'react-router-dom'
import Main from './components/Main';
import Create from './components/Create';
import SearchPlayers from './components/SearchPlayers';
import Give from './components/Give';
import Trade from './components/Trade';
import NoMatch from './pages/noMatch';
import Register from './pages/register';
import Login from './pages/login';
import Inventory from './pages/Inventory';
import PrivateRoute from './components/Auth';
// import PrivateRoute from './components/Auth';

//here is where we can see if the user is authenticated and will protect the routes. 
// const authed=true

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       authed === true
//         ? <Component {...props} />
//         : <Redirect to='/login' />
//     )} />
//   )
  
export default function App() {
    return (
        <div>
            <Nav />
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/Register" component={Register} />
                        <PrivateRoute exact path="/Create" component={Create} />
                        <PrivateRoute exact path="/SearchPlayers" component={SearchPlayers} />
                        <PrivateRoute exact path="/Give" component={Give} />
                        <PrivateRoute exact path="/Trade" component={Trade} />
                        <PrivateRoute exact path="/Inventory" component={Inventory} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
