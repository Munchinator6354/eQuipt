import React, {useState, createContext, Component} from 'react';
import axios from 'axios';
import API from "../utils/API";
import LoginForm from "../components/LoginForm";
import background from '../images/Door.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../actions/incrementAction'
import { login } from '../actions/logIn';
import { Link } from 'react-router-dom';


// const counter = useSelector(state => state.counter);
// const isLogged = useSelector(state => state.isLogged);

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
    buttonFont: {
        fontSize: "1em",
        fontFamily: "Almendra SC, serif",
        marginLeft: "15px"
    }
}

export default function Login() {
    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    let userName = React.createRef();
    let password = React.createRef();
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
                    <br />
                    <div className="form-group row">
                        <button 
                            style={styles.buttonFont} 
                            onClick={ (event)=>{ 
                                event.preventDefault();
                                // console.log(event.target.querySelector('input').value);
                                // console.log(textInput.current.value)
                                API.authenticateUser({username: userName.current.value, password: password.current.value }).then(
                                dispatch(login())
                                )
                            }} 
                            className="btn btn-outline-light fadeUp">
                            Login
                        </button>
                    </div>
                </form>
                <br />
                <h2 style={styles.font} className="fadeUp">Register 
                <Link to="/register" >
                    here 
                </Link>
                if you must!</h2>
                
            </div>
        </div>
    )
}


// class Login extends Component {
 
//     styles = {
//         background: {
//             backgroundImage: `url(${background})`,
//             color: "white",
//             height: "95vh",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//         },
//         center: {
//             opacity: "1",
//             color: "white",
//             backgroundColor: "rgba(0,0,0,.7)",
//             height:"95vh",
//         },
//         font:{
//             marginBottom: "5px",
//             fontSize: "1.6em",
//             fontFamily: "Almendra SC, serif"
//         },
//         labelFont: {
//             fontSize: "1em",
//             fontFamily: "Almendra SC, serif",
//         },
//         buttonFont: {
//             fontSize: "1em",
//             fontFamily: "Almendra SC, serif",
//             marginLeft: "15px"
//         }
//     }
    
//         state = {
//             username: "",
//             password: "",
//             loggedIn: false,
//             error: ""
//         };
        
//     handleInputChange = event => {
//         const{name, value} = event.target;
//         this.setState({ 
//             [name]: value});
//     };
//     handleFormSubmit = event => {    
//         event.preventDefault();

        
//         // dispatch(login())
//         API.authenticateUser({
//             username: this.state.username,
//             password: this.state.password
//         })
//         .then(
//             this.setState({loggedIn: true})
//             // function(){
                 
//             // const counter = useSelector(state => state.counter);
//             // const isLogged = useSelector(state => state.isLogged);
//             // const dispatch = useDispatch();
//             // ()=>dispatch(login())

//             // }
        
           
//            )
//         // console.log("HEEHEHEHEHEHEH")
//         // event.preventDefault();
//         // API.createItem({
//         //     name: this.state.name, 
//         //     description: this.state.description, 
//         //     itemlevel: this.state.itemlevel, 
//         //     marketprice: this.state.marketprice, 
//         //     quantity: this.state.quantity, 
//         //     link: this.state.link
//         // })

//         // API.authenticateUser({username: this.state.username, password: this.state.password})
//         // this.props.history.push('/')
//         // console.log("this is the event: " + event.response)
//         // console.log("this is from the login Form Page: " + this.state.username, this.state.password, this.state.loggedIn)
//     };
//     // getUser() {
//     //     axios.get('/api/user').then(response => {
//     //         console.log('Get user response: ');
//     //         console.log(response.data);
//     //         if (response.data.user) {
//     //             console.log('Get User: There is a user saved in the server session: ');

//     //             this.setState({
//     //                 loggedIn: true,
//     //                 username: response.data.user.username
//     //             });
//     //         } else {
//     //             console.log('Get user: no user');
//     //             this.setState({
//     //                 loggedIn: false,
//     //                 username: null
//     //             });
//     //         }
//     //         console.log("current state within axios call: " + this.state.loggedIn + " " + this.state.username)
//     //     });
        
//     // }
//     render() {
        
//         return (
//             <div>
//             {/* <LoginForm
//             handleInputChange={this.handleInputChange}
//             handleFormSubmit={this.handleFormSubmit}
//             /> */}
//                  <div className="container" style={this.styles.center}>
//                 <br />
//                 <h1 style={this.styles.font} className="fadeUp">Login if you dare!</h1><br/>
//                 <form>
//                     <div className="form-group row">
//                         <label style={this.styles.labelFont} htmlFor="username" className="col-sm-2 col-form-label fadeUp">User Name</label>
//                         <div className="col-sm-10">
//                             <input 
//                                 type="text" 
//                                 className="form-control fadeUp" 
//                                 id="username"
//                                 name="username" 
//                                 value={this.userName} 
//                                 onChange={this.handleInputChange}
//                                 />
//                         </div>
//                     </div>
//                     <div className="form-group row">
//                         <label style={this.styles.labelFont} htmlFor="inputPassword" className="col-sm-2 col-form-label fadeUp">Password</label>
//                         <div className="col-sm-10">
//                             <input 
//                                 type="password" 
//                                 className="form-control fadeUp" 
//                                 name="password"
//                                 value={this.password}
//                                 onChange={this.handleInputChange}
//                                 id="inputPassword" />
//                         </div>
//                     </div>
//                     <br />
//                     <div className="form-group row">
//                         <button 
//                             style={this.styles.buttonFont} 
//                             type="submit" 
//                             onClick={this.handleFormSubmit, ()=> dispatch(login())} 
//                             className="btn btn-outline-light fadeUp">
//                             Login
//                         </button>
//                     </div>
//                 </form>
//                 <br />
//                 <h2 style={this.styles.font} className="fadeUp">Register 
//                 <Link to="/register" >
//                     here 
//                 </Link>
//                 if you must!</h2>
                
//             </div>
//             </div>

//         )
//     }
// }

// export default Login;
