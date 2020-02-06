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
        height:"95vh",
    },
    font:{
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
export default function Create(props) {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Create Item</h1>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="username" className="col-sm-2 col-form-label fadeUp">Item Name</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control fadeUp" 
                                id="name"
                                name="name" 
                                value={props.name} 
                                onChange={props.handleInputChange}
                                />
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
                                value={props.description}
                                onChange={props.handleInputChange}
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
                                value={props.itemlevel} 
                                onChange={props.handleInputChange}
                                />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="marketprice" className="col-sm-2 col-form-label fadeUp">Market Price</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control fadeUp" 
                                id="marketprice"
                                name="marketprice" 
                                value={props.marketprice} 
                                onChange={props.handleInputChange}
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
                                value={props.link} 
                                onChange={props.handleInputChange}
                                />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <button 
                            style={styles.buttonFont} 
                            type="submit" 
                            onClick={props.handleFormSubmit} 
                            className="btn btn-outline-light fadeUp">
                            Forge New Item
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
                )
            }
