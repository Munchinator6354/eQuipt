import React from 'react'
import background from "../../images/Gift.jpg";
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
}
export default function Give(props) {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Give Item</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label fadeUp">Example select</label>
                        <div className="col-sm-10">
                            <select className="form-control fadeUp" id="exampleFormControlSelect1">
                                <option>Long Sword</option>
                                <option>Metal Axe</option>
                                <option>Shield</option>
                                <option>Large Shield</option>
                                <option>Cloak</option>
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
                                value={props.password}
                                onChange={props.handleInputChange}
                                id="qtyToGive" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="inputPassword" className="col-sm-2 col-form-label fadeUp">Player to Give</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control fadeUp"
                                name="playerToGive"
                                value={props.password}
                                onChange={props.handleInputChange}
                                id="playerToGive" />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <button
                            style={styles.buttonFont}
                            type="submit"
                            onClick={props.handleFormSubmit}
                            className="btn btn-outline-light fadeUp">
                            Give
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
