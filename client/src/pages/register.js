import React, { Component } from 'react';
import API from "../utils/API";
import RegisterForm from "../components/Register";


class Register extends Component {

    state = {
        username: "",
        playerName: "",
        characterName: "",
        email: "",
        password: "",
        error: ""
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        API.signUpUser(
            {
                playername: this.state.playerName,
                username: this.state.username,
                password: this.state.password,
                charactername: this.state.characterName,
                email: this.state.email,
                role: "Player",
                inventory: []
            })
    };
    render() {
        return (
            <RegisterForm
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
            />

        );
    }
}
export default Register;