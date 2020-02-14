import React, {useState} from 'react';
import API from "../../utils/API";
import background from "../../images/Gift.jpg";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { login } from '../../actions/logIn';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/logout';
import { username } from '../../actions/getUsername';
import { getUserInfo } from '../../actions/getUserInfo';


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
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const username1 = userInfo.userName
    let userName = React.createRef();
    let password = React.createRef();
    const [loginError, setError] = useState("");
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
                                {userInfo.inventory.map(item => (

                                
                                        <option>{item.name}</option>
                                    

                                ))}
                            
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
                            className="btn btn-outline-light fadeUp"
                            onClick={ (event)=>{ 
                                event.preventDefault();
                                API.giveToUser({inventoryid: '5e45c9d2d5005f58986aa31f', quantity: 1 })
                                .then(
                                    function(response){
                                        // if(response){
                                  
                                       
                                        // setError("")
                                        // console.log(response)
                                        // }
                                        console.log(response)
                                    
                                    }
                                )
                                .catch(
                                    function(error){
                                        console.log(error)
                                    }
                                    // function(error) {
                                    //     if(error == "Error: Failed to login"){
                                    //        setError("Username or Password incorrect please try again")
                                    //     }
                                    //     dispatch(logout())
                                    // }
                                );
                             
                            }} 
                            >
                            Give
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
