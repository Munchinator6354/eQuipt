import React, {useState} from 'react';
import API from "../utils/API";
import background from '../images/Door.jpg'
import { useDispatch } from 'react-redux'
import { login } from '../actions/logIn';
import { Link } from 'react-router-dom';
import { logout } from '../actions/logout';
import { username } from '../actions/getUsername';

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
        height:"95vh",
    },
    font:{
        marginBottom: "5px",
        fontSize: "1.6em",
        fontFamily: "Almendra SC, serif"
    },
    labelFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
    },
    errorFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
        color: "red"
    },
    buttonFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
        marginLeft: "15px"
    }
}

export default function Login() {

    const dispatch = useDispatch();
    let userName = React.createRef();
    let password = React.createRef();
    const [loginError, setError] = useState("");

    return (
        <div style={styles.background}>
             <div className="container" style={styles.center}>
                <br />
                <h1 style={styles.font} className="fadeUp">Login if you dare!</h1><br/>
                <form>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="username" className="col-sm-2 col-form-label fadeUp">User Name</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control fadeUp" 
                                id="username"
                                name="username" 
                                ref={userName}
                                />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label style={styles.labelFont} htmlFor="inputPassword" className="col-sm-2 col-form-label fadeUp">Password</label>
                        <div className="col-sm-10">
                            <input 
                                type="password" 
                                className="form-control fadeUp" 
                                name="password"
                                id="inputPassword" 
                                ref={password}/>
                        </div>
                    </div>
                    <p style={styles.errorFont} className="text-center">{loginError}</p>
                    <br />
                    <div className="form-group row">
                        <button 
                            style={styles.buttonFont} 
                            onClick={ (event)=>{ 
                                event.preventDefault();
                                API.authenticateUser({username: userName.current.value, password: password.current.value })
                                .then(
                                    function(response){
                                        if(response){
                                        dispatch(login())
                                        dispatch(username(response.data.username))
                                        setError("")
                                        console.log(response)
                                        }
                                    
                                    }
                                )
                                .catch(
                                    function(error) {
                                        if(error == "Error: Failed to login"){
                                           setError("Username or Password incorrect please try again")
                                        }
                                        dispatch(logout())
                                    }
                                );
                                API.getUserInfo({}).then(
                                    function(response){
                                    }
                                )
                            }} 
                            className="btn btn-outline-light fadeUp">
                            Login
                        </button>
                    </div>
                </form>
                <br />
                <h2 style={styles.font} className="fadeUp">Register &nbsp;
                <Link to="/register" >
                    here 
                </Link>
                &nbsp;if you must!</h2>
                
            </div>
        </div>
    )
}