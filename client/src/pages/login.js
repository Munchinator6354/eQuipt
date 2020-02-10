import React, {useState, createContext, Component} from 'react';
import axios from 'axios';
import API from "../utils/API";
import LoginForm from "../components/LoginForm";

class Login extends Component {

        state = {
            username: "",
            password: "",
            loggedIn: false,
            error: ""
        };
        
    handleInputChange = event => {
        const{name, value} = event.target;
        this.setState({ 
            [name]: value});
    };
    handleFormSubmit = event => {    
        event.preventDefault();

        // API.authenticateUser({username: this.state.username, password: this.state.password})
        // this.props.history.push('/')
        // console.log("this is the event: " + event.response)
        // console.log("this is from the login Form Page: " + this.state.username, this.state.password, this.state.loggedIn)
    };
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
            console.log("current state within axios call: " + this.state.loggedIn + " " + this.state.username)
        });
        
    }
    render() {
        return (
            <div>
            <LoginForm
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            />
            </div>

        )
    }
}

export default Login;
