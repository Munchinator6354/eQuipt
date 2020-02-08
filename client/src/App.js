import React, {Component} from 'react';
import Nav from './components/Nav';
import RouteHandler from './components/RouteHandler';


class App extends Component{
    render(){
    return (
        <div>
            <Nav />
            <RouteHandler />
        </div>
    )
    }
}

export default App;