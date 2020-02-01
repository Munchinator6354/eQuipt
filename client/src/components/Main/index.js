import React from 'react'
import background from "../../images/Market_Background.jpg";
import "./index.scss"
const styles = {
    background: {
        backgroundImage: `url(${background})`,
        color: "white",
        height: "100vh",
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
    
        height:"100vh",


       
    },
    fontSize: {
        fontSize: "0.9rem",
        marginTop: "15px"
    },


};
export default function Main() {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <h1 className="fadeUp">Welcome to eQuipt</h1>
            </div>
        </div>
     
    )
}
