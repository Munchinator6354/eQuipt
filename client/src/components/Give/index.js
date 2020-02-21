import React, { useState } from 'react';
import API from "../../utils/API";
import background from "../../images/Gift.jpg";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../actions/getUserInfo';

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

export default function Give(props) {
    
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    
    let selectedItem = React.createRef();
    let qtyToGive = React.createRef();
    let userToGive = React.createRef();
    
    const [itemID, setItemID] = useState("");
    
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Give Item</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label fadeUp">Item Name</label>
                        <div className="col-sm-10">
                            <select onChange={(e) => setItemID(e.target.value)} className="form-control fadeUp" id="exampleFormControlSelect1">
                                <option value="default" selected="selected">Select one option </option>
                                {userInfo.inventory.map(item => (
                                    <option ref={selectedItem} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="inputPassword" className="col-sm-2 col-form-label fadeUp">Quantity to Give</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control fadeUp"
                                name="qtyToGive"
                                id="qtyToGive"
                                ref={qtyToGive} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="inputPassword" className="col-sm-2 col-form-label fadeUp">Player to Give</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                name="playerToGive"
                                ref={userToGive}
                                id="playerToGive" />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <button
                            style={styles.buttonFont}
                            type="submit"
                            className="btn btn-outline-light fadeUp"
                            onClick={(event) => {
                                event.preventDefault();
                                API.giveToUser({ inventoryid: itemID, quantity: parseInt(qtyToGive.current.value), userToGive: userToGive.current.value, userGiving: userInfo.username })
                                    .then(
                                        function(response) {

                                            API.getUserInfo({ username: userInfo.username })
                                                .then(
                                                    function(response) {
                                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
                                                        console.log(JSON.parse(JSON.stringify(response.data)));
                                                    }
                                                )
                                                .catch(
                                                );

                                        }
                                    )
                                    .catch(
                                        function(error) {
                                            console.log(error);
                                        }
                                    );
                            }}>
                            Give
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
