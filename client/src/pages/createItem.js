import React, { Component } from 'react'
import Create from '../components/Create'
import { useSelector } from 'react-redux';
import API from "../utils/API";
export default class createItem extends Component {
    state = {
        name: "",
        description: "",
        itemlevel: 0,
        marketprice: 0,
        quantity: 0,
        link: "",
        error: ""
    }
    handleInputChange = event => {
        const{name, value} = event.target;
        this.setState({ 
            [name]: value});
    };
    handleFormSubmit = event => {
        console.log("HEEHEHEHEHEHEH")
        const userInfo = useSelector(state => state.userInfo);
        event.preventDefault();
        API.createItem({
            username: userInfo,
            name: this.state.name, 
            description: this.state.description, 
            itemlevel: this.state.itemlevel, 
            marketprice: this.state.marketprice, 
            quantity: this.state.quantity, 
            link: this.state.link
        })
    };
    render() {
        return (
            <div>
                <Create 
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit} />
            </div>
        )
    }
}
