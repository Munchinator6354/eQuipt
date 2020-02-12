import React, { Component } from 'react'
import InventoryForm from '../components/Inventory'
// import Axios from 'axios';
import API from "../utils/API";

export default class Inventory extends Component {
    state = {
        inventoryArray: [],
    };

    componentDidMount() {
        API.grabPlayerInventory().then(res => {
            console.log(res);
            this.setState({ inventoryArray: res.data});
        });
    }

    render() {
        return (
            <div>
                <InventoryForm/>
            </div>
        )
    }
}
