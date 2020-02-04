import React, { Component } from 'react';
import API from "../utils/API";
import RegisterForm from "../components/Register";


class Register extends Component {

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
        API.signUpUser(this.state.username, this.state.password)
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
            <RegisterForm
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            />

        )
    }
}
export default Register;