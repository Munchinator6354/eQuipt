import React from 'react'
import background from "../../images/Door.jpg";
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
export default function InventoryForm(props) {
    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 style={styles.font} className="fadeUp">Inventory</h1><br />

                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Long Sword</td>
                            <td>1</td>
                            <td>Attack</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Wooden Shield</td>
                            <td>1</td>
                            <td>Defense</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Healing Potion</td>
                            <td>3</td>
                            <td>Health</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}
