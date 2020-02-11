import React from 'react'
import background from "../../images/exit.jpg";
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
    }
}
export default function logOut(props) {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 style={styles.font} className="fadeUp">You have logged out</h1><br />
                <a href ="/login" style={styles.font} className="fadeUp">Log back in</a>
            </div>
        </div>
    )
}
