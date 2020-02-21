import React, { useState } from 'react';
import API from "../utils/API";
import background from "../images/Create.jpg";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../actions/getUserInfo';

const styles = {
    background: {
        backgroundImage: `url(${background})`,
        color: "white",
        height: "95vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "gray"
    },
    center: {
        opacity: "1",
        color: "white",
        backgroundColor: "rgba(0,0,0,.7)",
        height: "95vh",
    },
    font: {
        marginBottom: "5px",
        fontSize: "1.55em",
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
    }
};

export default function CreateNewItem() {
    
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const adminInventory = useSelector(state => state.adminInventory);
    
    let selectedItem = React.createRef();
    let itemQuantity = React.createRef();
    
    const [itemID, setItemID] = useState("");

    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Create Item</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="itemName" className="col-sm-2 col-form-label fadeUp">Item Name</label>
                        <div className="col-sm-10">
                            <select onChange={(e) => { setItemID(e.target.value) }} className="form-control fadeUp" id="itemName">
                            <option value="default" selected="selected">Select one option</option>
                                {adminInventory.map(item => (
                                        <option ref={selectedItem} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="quantity" className="col-sm-2 col-form-label fadeUp">Item Quantity</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control fadeUp"
                                id="link"
                                name="link"
                                ref={itemQuantity}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <button
                            style={styles.buttonFont}
                            type="submit"
                            onClick={(event) => {
                                event.preventDefault();
                                const object = adminInventory.find(item => item._id === itemID);
                                API.createItem({
                                    username: userInfo.username,
                                    name: object.name,
                                    description: object.description,
                                    itemlevel: object.itemLevel,
                                    quantity: parseInt(itemQuantity.current.value),
                                    link: object.link
                                }).then(
                                    function(response) {
                                        API.getUserInfo({ username: userInfo.username })
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
                                    }
                                ).catch(
                                    function(error) {
                                        console.log(error);
                                    }
                                );
                            }}
                            className="btn btn-outline-light fadeUp">
                            Create Inventory Item
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
