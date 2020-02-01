import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login'
import Create from './components/Create'
import SearchPlayers from './components/Search'
import Give from './components/Give'
import Trade from './components/Trade'
import NoMatch from './pages/noMatch'



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
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
