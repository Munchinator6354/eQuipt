import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/logout';
const styles = {
    background: {
        backgroundColor: "rgba(0,0,0,.7)",
    },
    font: {
        fontSize: "1.15em",
        fontFamily: "Almendra SC, serif"
    },
    headerFont: {
        fontSize: "1.75em",
        fontFamily: "Almendra SC, serif"
    },
    welcomeFont: {
        fontSize: "1.3em",
        fontFamily: "Almendra SC, serif",
        marginTop: "1em",
        color: "#1C246E"
    }

}
export default function Navbar() {
    const username = useSelector(state => state.username);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    return (
        <div>
            <nav style={styles.background} className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                    <Link to="/" style={styles.headerFont} className="navbar-brand">
                        eQuipt
                    </Link>
                    {isLogged ? <p style={styles.welcomeFont} className="navbar-brand">Welcome {username}</p>: ''}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                    {isLogged ? '':
                        <li className="nav-item active">
                            <Link to="/login" style={styles.font} className="navbar-brand nav-link">
                                Login
                            </Link>
                        </li>
                        }
                        {isLogged ?
                        <li className="nav-item active">
                            <Link to="/searchPlayers" style={styles.font} className = "navbar-brand nav-link">
                            Search
                            </Link>
                        </li>
                        : ''}
                        {isLogged ?
                        <li className="nav-item active">
                            <Link to="/Inventory" style={styles.font} className = "navbar-brand nav-link">
                            Inventory
                            </Link>
                        </li>
                        : ''}
                        {isLogged ?
                        <li className="nav-item active">
                            <Link to="/give" style={styles.font} className = "navbar-brand nav-link">
                            Give
                            </Link>
                        </li>
                        : ''}
                        {isLogged ?
                        <li className="nav-item active">
                            <Link to="/trade"style={styles.font}  className = "navbar-brand nav-link">
                            Trade
                            </Link>
                        </li>
                        : ''}
                        {isLogged ?
                        <li className="nav-item active">
                            <Link to="/create" style={styles.font} className = "navbar-brand nav-link">
                            Create
                            </Link>
                        </li>
                        : ''}
                        {isLogged ?
                        <li className="nav-item active" onClick={()=> dispatch(logout())}>
                            <Link to="/logout" style={styles.font} className = "navbar-brand nav-link">
                            Logout
                            </Link>
                        </li>
                        : ''}
                        
                        <li className="nav-item active">
                            <Link to="/test" style={styles.font} className = "navbar-brand nav-link">
                            Test
                            </Link>
                        </li>
                       
                    </ul>
                </div>
            </nav>
        </div>
    )
}


