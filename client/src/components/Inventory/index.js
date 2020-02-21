import React from 'react';
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
    itemFont: {
        marginBottom: "5px",
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
        textAlign: "center"
    },
    labelFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
    },
    itemTitle: {
        marginBottom: "5px",
        fontSize: "1.8em",
        fontFamily: "Almendra SC, serif",
        textAlign: "center"
    },
    buttonFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
        marginLeft: "15px"
    },
    imageFormat: {
        height: "12vh"
    },
    quantityWidth: {
        columnWidth: "300px"
    },
    button: {
        color: "white"
    },
    tableBorder: {
        border: "1px solid white"
    }
};

function PlayerQuantity(props) {
    return <td style={styles.itemFont} className="d-block" key={props.theItem.name.quantity}>{props.theItem.quantity}</td>;
}

function StaffQuantity(props) {
    const dispatch = useDispatch();
    return (
        <td style={styles.itemFont} className="d-block" key={props.theItem.name.quantity}>
            <button
                className="btn btn-secondary mr-2"
                style={styles.button}
                onClick={(event) => {
                    event.preventDefault();
                    API.changeQuantity({ id: props.theItem._id, quantity: props.theItem.quantity + 1 })
                        .then(function(response) {
                            API.getUserInfo({ username: props.theUser.username })
                                .then(
                                    function(response) {
                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
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
                ▲
            </button>
            <button type="text" className="btn btn-secondary">{props.theItem.quantity}</button>&nbsp;&nbsp;&nbsp;
            <button
                className="btn btn btn-secondary mr-2"
                style={styles.button}
                onClick={(event) => {
                    event.preventDefault();
                    API.changeQuantity({ id: props.theItem._id, quantity: props.theItem.quantity - 1 })
                        .then(function(response) {
                            API.getUserInfo({ username: props.theUser.username })
                                .then(
                                    function(response) {
                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
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
                ▼
                </button>
            <button
                className="btn btn-danger mx-2"
                onClick={(event) => {
                    event.preventDefault();
                    API.deleteItem(props.theItem._id)
                        .then(function(response) {
                            API.getUserInfo({ username: props.theUser.username })
                                .then(
                                    function(response) {
                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
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
                Delete
                </button>
        </td>
       
    );
}

function Quantity(props) {
    const playerType = props.theUser.role;
    if (playerType === "Staff" || playerType === "Admin") {
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
                <div className="table-responsive-sm">
                <table className="table table-sm table-striped table-dark">
                    <tbody>
                        {/* <tr>
                            <th scope="col" className="d-block" >Name</th>
                            <th scope="col" className="d-block">Description</th>
                            <th scope="col" className="d-block">Level</th>
                            <th scope="col" className="d-block">Image</th>
                            <th scope="col" className="d-block" style={styles.quantityWidth}>Quantity</th>
                            
                        </tr> */}

                        {userInfo.inventory.map(item => (
                          
                            <tr style={styles.tableBorder} key={item._id}>
                                <td key={item.name} style={styles.itemTitle} className="d-block">{item.name}</td>
                                <td key={item.description} style={styles.itemFont} className="d-block"> {item.description}</td>
                                <td key={item.itemlevel} style={styles.itemFont} className="d-block">Item Level: {item.itemlevel}</td>
                                <td key={item.link} style={styles.itemFont} className="d-block"><img style={styles.imageFormat} src={item.link} alt={item.name + 'image'} /></td>
                                <Quantity theItem={item} theUser={userInfo} />
                                
                            </tr>
                           
                        ))}
                    </tbody>
                </table>
                </div>
            
            </div>
        </div>
    );
}
