import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from 'react-router-dom'
import Main from '../Main'
import CreateItem from '../../pages/createItem';
import SearchPlayers from '../SearchPlayers';
import Give from '../Give';
import Trade from '../Trade';
import NoMatch from '../../pages/noMatch';
import Register from '../../pages/register';
import Login from '../../pages/login';
import Inventory from '../../pages/Inventory';
import ProtectedRoute from '../ProtectedRoute';
// import LoggedInProvider from '../../LoggedInContext';
import TestComponent from '../TestComponent';
import Navbar from '../Navbar';



export default function RouteHandler(props) {
    return (
        <div>
            {/* <LoggedInProvider> */}

            
            <Router>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/login" component={Login}/>
                        <Route exact path='/test' component={TestComponent}/>
                        <ProtectedRoute exact path="/Create" component={CreateItem}/>
                        <ProtectedRoute exact path="/SearchPlayers" component={SearchPlayers} />
                        <ProtectedRoute exact path="/Give" component={Give} />
                        <ProtectedRoute exact path="/Trade" component={Trade} />
                        <ProtectedRoute exact path="/Inventory" component={Inventory} />
                        <Route exact path="/Register" component={Register} />

                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
            
{/* 
            </LoggedInProvider> */}
        </div>
    )
}
