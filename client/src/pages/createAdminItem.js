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

function CreateAdminItemModal(props) {
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

function SubmitCreateAdminItem(props) {
    
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
                    const newItem = {
                        name: props.theItemInfo.name,
                        description: props.theItemInfo.description,
                        itemlevel: props.theItemInfo.level,
                        link: props.theItemInfo.link
                    }
                    API.createAdminItem(newItem).then(
                        function (response) {
                            
                            const createdItem = response.data;

                            API.getUserInfo({ username: props.theUserInfo.username })
                                .then(
                                    function (response) {
                                        dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));

                                        let messageString = "New item created successfully with the following details." +
                                            " Item Name: " + createdItem.name +
                                            ", Item Description: " + createdItem.description + 
                                            ", Item Level: " + createdItem.itemlevel +
                                            ", Item Image Link: " + createdItem.link;

                                        setModalMessage(messageString);
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
                Forge New Admin Item
            </button>
            <CreateAdminItemModal show={modalShow} message={modalMessage} title={modalTitle} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default function CreateAdminItem() {

    const userInfo = useSelector(state => state.userInfo);

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemLevel, setItemLevel] = useState(0);
    const [itemImageLink, setItemImageLink] = useState("");

    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Create Admin Item</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="itemName" className="col-sm-2 col-form-label fadeUp">Item Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                id="itemName"
                                name="itemName"
                                onChange={(e) => { setItemName(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="itemDescription" className="col-sm-2 col-form-label fadeUp">Item Description</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                id="itemDescription"
                                name="itemDescription"
                                onChange={(e) => { setItemDescription(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="itemlevel" className="col-sm-2 col-form-label fadeUp">Item Level</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                id="itemlevel"
                                name="itemlevel"
                                onChange={(e) => { setItemLevel(parseInt(e.target.value)) }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="itemImageLink" className="col-sm-2 col-form-label fadeUp">Image Link</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                id="itemImageLink"
                                name="itemImageLink"
                                onChange={(e) => { setItemImageLink(e.target.value) }}
                            />
                        </div>
                    </div>
                    <br />
                    <SubmitCreateAdminItem theItemInfo={{ name: itemName, description: itemDescription, level: itemLevel, link: itemImageLink }} theUserInfo={userInfo} />
                </form>
            </div>
        </div>
    );
}
