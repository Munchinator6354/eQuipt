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


};
export default function Main() {
    return (
        <div style = {styles.background}>
            <h1 className="fadeUp">Main Landing Page</h1>
        </div>
    )
}
