import React, { Component } from 'react';
import API from "../utils/API";
import LoginForm from "../components/LoginForm";


class Login extends Component {

    // constructor(){
    //     super();
        // this.authenticated=true;
        state = {
            username: "",
            password: "",
            loggedIn: true,
            error: ""
        };
        
    // }

    handleInputChange = event => {
        const{name, value} = event.target;
        this.setState({ 
            [name]: value});
    };
    handleFormSubmit = event => {
        event.preventDefault();
        API.authenticateUser({username: this.state.username, password: this.state.password})
    };
    login(cb){
        this.authenticated=true;
        cb();
    }
    logout(cb){
        this.authenticated=false;
        cb()
    }
    isAuthenticated(){
        
        return  this.authenticated
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
