import React from 'react';
import background from "../../images/Door.jpg";
import { useSelector, useDispatch } from 'react-redux';

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



export default function InventoryForm() {
    const userInfo = useSelector(state => state.userInfo);

    return (

        <div style={styles.background}>
            <div className="container" style={styles.center}>
                <br />
                <h1 style={styles.font} className="fadeUp">Inventory</h1><br />

                <table className="table table-dark">

                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Item Level</th>
                        <th scope="col">Market Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Image Link</th>
                    </tr>

                    {userInfo.inventory.map(user => (

                        <tr>
                            <td>{user.name}</td>
                            <td>{user.description}</td>
                            <td>{user.itemlevel}</td>
                            <td>{user.marketprice}</td>
                            <td>{user.quantity}</td>
                            <td>{user.link}</td>
                        </tr>

                    ))}


                </table>

            </div>
        </div>
    )
}
