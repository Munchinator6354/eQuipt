import React, { useEffect } from 'react';
import background from "../../images/Door.jpg";
import API from "../../utils/API";
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../actions/getUserInfo';
import { useDispatch } from 'react-redux';

const styles = {
    background: {
        backgroundImage: `url(${background})`,
        color: "white",
        height: "95vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    center: {
        opacity: "1",
        color: "white",
        backgroundColor: "rgba(0,0,0,.7)",
        height: "95vh",
        overflow: "scroll",
        overflowX: "hidden",
    },
    font: {
        marginBottom: "5px",
        fontSize: "1.6em",
        fontFamily: "Almendra SC, serif"
    },
    labelFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
    },
    buttonFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
        marginLeft: "15px"
    },
    imageFormat: {
        height: "5vh"
    },
    quantityWidth: {
        columnWidth: "300px"
    }
};

function PlayerQuantity(props) {
    return <td key={props.theItem.name.quantity}>{props.theItem.quantity}</td>;
}

function StaffQuantity(props) {
    const dispatch = useDispatch();
    return (
        <td key={props.theItem.name.quantity}>
            <button
                className="btn btn-secondary mr-2"
                onClick={(event) => {
                    event.preventDefault();
                    API.changeQuantity({ id: props.theItem._id, quantity: props.theItem.quantity + 1 })
                        .then(function(response) {
                            console.log(response);
                            API.getUserInfo({ username: props.theUser.username })
                                .then(
                                    function(response) {
                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
                                        console.log(JSON.parse(JSON.stringify(response.data)));
                                    }
                                )
                                .catch(
                                    function(error) {
                                        console.log(error);
                                    }
                                );
                        })
                        .catch(
                            function(error) {
                                console.log(error);
                            }
                        );
                }}>
                +
            </button>
            {props.theItem.quantity}
            <button
                className="btn btn-secondary ml-2"
                onClick={(event) => {
                    event.preventDefault();
                    API.changeQuantity({ id: props.theItem._id, quantity: props.theItem.quantity - 1 })
                        .then(function(response) {
                            console.log(response);
                            API.getUserInfo({ username: props.theUser.username })
                                .then(
                                    function(response) {
                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
                                        console.log(JSON.parse(JSON.stringify(response.data)));
                                    }
                                )
                                .catch(
                                    function(error) {
                                        console.log(error);
                                    }
                                );
                        })
                        .catch(
                            function(error) {
                                console.log(error);
                            }
                        );
                }}>
                -
                </button>
            <button className="btn btn-danger mx-2">Delete</button>
        </td>
    );
}

function Quantity(props) {
    const playerType = props.theUser.role;
    if (playerType === "Staff") {
        return <StaffQuantity theItem={props.theItem} theUser={props.theUser} />;
    }
    return <PlayerQuantity theItem={props.theItem} />;
}

export default function InventoryForm() {

    const userInfo = useSelector(state => state.userInfo);

    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 style={styles.font} className="fadeUp">Inventory</h1><br />

                <table className="table table-dark">
                    <tbody>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Item Level</th>
                            <th scope="col">Market Price</th>
                            <th scope="col" style={styles.quantityWidth}>Quantity</th>
                            <th scope="col">Image</th>
                        </tr>

                        {userInfo.inventory.map(item => (
                            <tr key={item._id}>
                                <td key={item.name}>{item.name}</td>
                                <td key={item.description}>{item.description}</td>
                                <td key={item.itemlevel}>{item.itemlevel}</td>
                                <td key={item.marketprice}>{item.marketprice}</td>
                                <Quantity theItem={item} theUser={userInfo} />
                                <td key={item.link}><img style={styles.imageFormat} src={item.link} alt={item.name + 'image'} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
