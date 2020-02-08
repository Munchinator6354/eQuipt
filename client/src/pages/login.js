import React, {Component, useState, createContext} from 'react';
import API from "../utils/API";
import LoginForm from "../components/LoginForm";
import Auth from "../components/ProtectedRoute";
import ProtectedRoute from '../components/ProtectedRoute';
import RouteHandler from '../components/RouteHandler'

class Login extends Component {

        state = {
            username: "",
            password: "",
            loggedIn: true,
            error: ""
        };
        
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
