import React from 'react'
import background from "../images/Lost.jpg";
import "./index.scss"
const styles = {
    background: {
        backgroundImage: `url(${background})`,
        color: "white",
        height: "95vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      
    },
    heading:{
        color: "white",
        textDecoration: "none"
    },
    center: {
        opacity: "1",
        color: "white",
        backgroundColor: "rgba(0,0,0,.7)",
        height:"95vh",
    },
    fontSize: {
        fontSize: "0.9rem",
        marginTop: "15px"
    },
    font:{
        marginBottom: "5px",
        fontSize: "1.6em",
        fontFamily: "Almendra SC, serif"
    },
    regularFont:{
        marginBottom: "5px",
        fontSize: "1em",
        fontFamily: "Almendra SC, serif"
    }


};
export default function NoMatch() {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Seems like you've lost your way</h1>
            </div>
        </div>
     
    )
}
