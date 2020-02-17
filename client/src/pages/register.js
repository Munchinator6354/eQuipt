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

    checkEmail = emailString => {
        let filter = /^[a -zA-Z0-9\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,5}$/;
        if (!filter.test(emailString)) {
            return false;
        } else {
            return true;
        }
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();   
        if (this.checkEmail(this.state.email) === true){
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
                
        }
        else {console.log('error')}

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