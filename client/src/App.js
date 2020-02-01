import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login'
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
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
