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
        API.authenticateUser(this.state.username, this.state.password)
            .then(res => {
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                this.setState({ results: res.data.message, error: "" });
            })
            .catch(err => this.setState({ error: err.message }));
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