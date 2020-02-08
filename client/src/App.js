import React, { Component } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Main from './components/Main';
import CreateItem from './pages/createItem';
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

// export default function App() {

//     return (
//         <div>
//             <Navbar />
//             <Router>
//                 <div>
//                     <Switch>
//                         <Route exact path="/" component={Main} />
//                         <Route exact path="/login" component={Login} />
//                         <Route exact path="/Register" component={Register} />
//                         <PrivateRoute exact path="/Create" component={CreateItem} />
//                         <PrivateRoute exact path="/SearchPlayers" component={SearchPlayers} />
//                         <PrivateRoute exact path="/Give" component={Give} />
//                         <PrivateRoute exact path="/Trade" component={Trade} />
//                         <PrivateRoute exact path="/Inventory" component={Inventory} />
//                         <Route component={NoMatch} />
//                     </Switch>
//                 </div>
//             </Router>
//         </div>
//     )
// }

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            username: null
        };

        this.getUser = this.getUser.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    updateUser(userObject) {
        this.setState(userObject);
    }

    getUser() {
        axios.get('/api/user').then(response => {
            console.log('Get user response: ');
            console.log(response.data);
            if (response.data.user) {
                console.log('Get User: There is a user saved in the server session: ');

                this.setState({
                    loggedIn: true,
                    username: response.data.user.username
                });
            } else {
                console.log('Get user: no user');
                this.setState({
                    loggedIn: false,
                    username: null
                });
            }
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/Register" component={Register} />
                            <PrivateRoute exact path="/Create" component={CreateItem} />
                            <PrivateRoute exact path="/SearchPlayers" component={SearchPlayers} />
                            <PrivateRoute exact path="/Give" component={Give} />
                            <PrivateRoute exact path="/Trade" component={Trade} />
                            <PrivateRoute exact path="/Inventory" component={Inventory} />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
