import React from 'react'
import background from "../../images/Market_Background.jpg";
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
export default function Main() {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 className="fadeUp" style={styles.font}>Welcome to eQuipt</h1>
                <p className="fadeUp" style={styles.regularFont}>Here you can give, trade, and recieve items for your epic journey</p>
            </div>
        </div>
     
    )
}
