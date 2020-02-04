import React from 'react';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import Create from './components/Create';
import SearchPlayers from './components/SearchPlayers';
import Give from './components/Give';
import Trade from './components/Trade';
import NoMatch from './pages/noMatch';
import Register from './pages/register';
import Login from './pages/login';



export default function App() {
    return (
        <div>
            <Nav />
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/Create" component={Create} />
                        <Route exact path="/SearchPlayers" component={SearchPlayers} />
                        <Route exact path="/Give" component={Give} />
                        <Route exact path="/Trade" component={Trade} />
                        <Route exact path="/Register" component={Register} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
