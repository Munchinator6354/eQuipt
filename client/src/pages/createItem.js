import React, { Component } from 'react'
import Create from '../components/Create'
import API from "../utils/API";
export default class createItem extends Component {
    handleInputChange = event => {
        const{name, value} = event.target;
        this.setState({ 
            [name]: value});
    };
    handleFormSubmit = event => {
        event.preventDefault();
        API.createItem({})
    };
    render() {
        return (
            <div>
                <Create  handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit} />
            </div>
        )
    }
}
