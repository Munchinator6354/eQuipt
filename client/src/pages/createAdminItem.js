import React, { useState } from 'react';
import background from "../images/Create.jpg";
import API from "../utils/API";
import { useSelector, useDispatch } from 'react-redux';
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
export default function CreateAdminItem() {
    
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    let itemName = React.createRef();
    let itemDescription = React.createRef();
    let itemLevel = React.createRef();
    let itemMarketPrice = React.createRef();
    let itemImageLink = React.createRef();
    // const [itemID, setItemID] = useState("");

    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Create Admin Item</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="username" className="col-sm-2 col-form-label fadeUp">Item Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                id="name"
                                name="name"
                                ref={itemName} />

                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="inputPassword" className="col-sm-2 col-form-label fadeUp">Item Description</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                id="description"
                                name="description"
                                ref={itemDescription} />

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
                                ref={itemLevel}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="link" className="col-sm-2 col-form-label fadeUp">Image Link</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                id="link"
                                name="link"
                                ref={itemImageLink}
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
                                API.createAdminItem({
                                    name: itemName.current.value,
                                    description: itemDescription.current.value,
                                    itemlevel: itemLevel.current.value,
                                    link: itemImageLink.current.value
                                }).then(
                                    function(response) {
                                        // API.getUserInfo({ username: userInfo.username })
                                        //     .then(
                                        //         function(response) {
                                        //             dispatch(getUserInfo(JSON.parse(JSON.stringify(response.data))));
                                        //         }
                                        //     )
                                        //     .catch(
                                        //         function(error) {
                                        //             console.log(error);
                                        //         }
                                        //     );
                                        console.log(response);
                                    }
                                ).catch(
                                    function(error) {
                                        console.log(error);
                                    }
                                );
                            }}
                            className="btn btn-outline-light fadeUp">
                            Forge New Admin Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
