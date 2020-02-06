import React, { Component } from 'react';
import API from "../utils/API";
import LoginForm from "../components/LoginForm";



class Login extends Component {

    state = {
        username: "",
        password: "",
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

    render() {
        return (
            <LoginForm
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            />

        )
    }
}
export default Login;