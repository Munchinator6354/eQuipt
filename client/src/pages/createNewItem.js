import React, { useState } from 'react';
import background from "../images/Create.jpg";
import API from "../utils/API";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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

function CreateItemModal(props) {
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

function SubmitCreate(props) {
    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="form-group row">
            <button
                style={styles.buttonFont}
                type="submit"
                onClick={(event) => {
                    event.preventDefault();
                    const object = props.theAdminInv.find(item => item._id === props.theItemId);
                    API.createItem({
                        username: props.theUserInfo.username,
                        name: object.name,
                        description: object.description,
                        itemlevel: object.itemLevel,
                        quantity: parseInt(props.theQuantity),
                        link: object.link
                    }).then(
                        function (response) {
                            console.log(response);
                            API.getUserInfo({ username: props.theUserInfo.username })
                                .then(
                                    function (response) {
                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
                                        setModalMessage("New item created successfully. Please navigate to Inventory to view it.");
                                        setModalTitle("Success");
                                        setModalShow(true);
                                    }
                                )
                                .catch(
                                    function (error) {
                                        console.log(error);
                                        setModalMessage(error);
                                        setModalTitle("Error");
                                        setModalShow(true);
                                    }
                                );
                        }
                    ).catch(
                        function (error) {
                            console.log(error);
                        }
                    );
                }}
                className="btn btn-outline-light fadeUp">
                Create Inventory Item
            </button>
            <CreateItemModal show={modalShow} message={modalMessage} title={modalTitle} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default function CreateNewItem() {

    const adminInventory = useSelector(state => state.adminInventory);
    const userInfo = useSelector(state => state.userInfo);

    let selectedItem = React.createRef();

    const [itemID, setItemID] = useState("");
    const [itemQuantity, setItemQuantity] = useState("0");

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
                                <option value="default">Select one option</option>
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
                                id="quantity"
                                name="quantity"
                                onChange={(e) => { setItemQuantity(e.target.value) }}
                            />
                        </div>
                    </div>
                    <br />
                    <SubmitCreate theItemId={itemID} theAdminInv={adminInventory} theUserInfo={userInfo} theQuantity={itemQuantity} />
                </form>
            </div>
        </div>
    );
}
