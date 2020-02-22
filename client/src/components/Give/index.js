import React, { useState } from 'react';
import API from "../../utils/API";
import background from "../../images/Gift.jpg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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

function GiveItemModal(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function SubmitGive(props) {
    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="form-group row">
            <button
                style={styles.buttonFont}
                type="submit"
                className="btn btn-outline-light fadeUp"
                onClick={(event) => {
                    event.preventDefault();
                    API.giveToUser({ inventoryid: props.theGiveInfo.itemID, quantity: parseInt(props.theGiveInfo.qtyToGive), userToGive: props.theGiveInfo.userToGive, userGiving: props.theUserInfo.username })
                        .then(
                            function (transactionDetails) {
                                const transaction = transactionDetails.data;
                                API.getUserInfo({ username: props.theUserInfo.username })
                                    .then(
                                        function (response) {
                                            dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
                                            
                                            let messageString = props.theGiveInfo.qtyToGive + " " + transaction.user2Item.name + "(s) successfully given to " + props.theGiveInfo.userToGive + "! ";
                                            if (transaction.user1ItemDeleted) {
                                                messageString += "All " + transaction.user1Item.name + "(s) were removed from your inventory.";
                                            } else {
                                                messageString += "You have " + transaction.user1Item.quantity + " " + transaction.user1Item.name + "(s) left in your inventory.";
                                            }
                                            
                                            setModalMessage(messageString);
                                            setModalTitle("Success");
                                            setModalShow(true);
                                        }
                                    )
                                    .catch(function (error) {
                                        console.log(error);
                                        setModalMessage(error);
                                        setModalTitle("Error");
                                        setModalShow(true);
                                    });
                            }
                        )
                        .catch(
                            function (error) {
                                console.log(error);
                            }
                        );
                }}>
                Give
            </button>
            <GiveItemModal show={modalShow} message={modalMessage} title={modalTitle} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default function Give() {

    const userInfo = useSelector(state => state.userInfo);

    let selectedItem = React.createRef();

    const [itemID, setItemID] = useState("");
    const [qtyToGive, setQtyToGive] = useState("");
    const [userToGive, setUserToGive] = useState("");

    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Give Item</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="itemName" className="col-sm-2 col-form-label fadeUp">Item Name</label>
                        <div className="col-sm-10">
                            <select onChange={(e) => setItemID(e.target.value)} className="form-control fadeUp" id="itemName">
                                <option value="default">Select one option </option>
                                {userInfo.inventory.map(item => (
                                    <option ref={selectedItem} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="qtyToGive" className="col-sm-2 col-form-label fadeUp">Quantity to Give</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control fadeUp"
                                name="qtyToGive"
                                id="qtyToGive"
                                onChange={(e) => { setQtyToGive(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="playerToGive" className="col-sm-2 col-form-label fadeUp">Player to Give To</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                name="playerToGive"
                                id="playerToGive"
                                onChange={(e) => { setUserToGive(e.target.value) }}
                            />
                        </div>
                    </div>
                    <br />
                    <SubmitGive theUserInfo={userInfo} theGiveInfo={{ itemID: itemID, qtyToGive: qtyToGive, userToGive: userToGive }} />
                </form>
            </div>
        </div>
    );
}
