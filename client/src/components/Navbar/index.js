import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/logout';
import { username } from '../../actions/getUsername';
import { getUserInfo } from '../../actions/getUserInfo';

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
    }

};
export default function Navbar() {
    const userName = useSelector(state => state.username);
    const isLogged = useSelector(state => state.isLogged);
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    return (
        <div>
            <nav style={styles.background} className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <Link to="/" style={styles.headerFont} className="navbar-brand">
                    eQuipt
                    </Link>
                {isLogged ? <p style={styles.welcomeFont} className="navbar-brand">Welcome &nbsp;{userName}</p> : ''}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {isLogged ? '' :
                            <li className="nav-item active">
                                <Link to="/login" style={styles.font} className="navbar-brand nav-link">
                                    Login
                            </Link>
                            </li>
                        }
                        {/* {isLogged ?
                            <li className="nav-item active">
                                <Link to="/searchPlayers" style={styles.font} className="navbar-brand nav-link">
                                    Search
                            </Link>
                            </li>
                            : ''} */}
                        {isLogged ?
                            <li className="nav-item active">
                                <Link to="/Inventory" style={styles.font} className="navbar-brand nav-link">
                                    Inventory
                            </Link>
                            </li>
                            : ''}
                        {isLogged ?
                            <li className="nav-item active">
                                <Link to="/Give" style={styles.font} className="navbar-brand nav-link">
                                    Give
                            </Link>
                            </li>
                            : ''}
                        {/* {isLogged ?
                            <li className="nav-item active">
                                <Link to="/trade" style={styles.font} className="navbar-brand nav-link">
                                    Trade
                            </Link>
                            </li>
                            : ''} */}
                        {(isLogged === true && (userInfo.role === "Staff" || userInfo.role === "Admin")) ?
                            <li className="nav-item active">
                                <Link to="/Create" style={styles.font} className="navbar-brand nav-link">
                                    Create
                            </Link>
                            </li>
                            : ''}
                        {(isLogged === true && userInfo.role === "Admin") ?
                            <li className="nav-item active">
                                <Link to="/CreateAdmin" style={styles.font} className="navbar-brand nav-link">
                                    Forge New Item
                            </Link>
                            </li>
                            : ''}
                        {isLogged ?
                            <li className="nav-item active" onClick={() => {
                                dispatch(logout());
                                dispatch(username(""));
                                dispatch(getUserInfo(""));
                            }}>
                                <Link to="/logout" style={styles.font} className="navbar-brand nav-link">
                                    Logout
                            </Link>
                            </li>
                            : ''}
                    </ul>
                </div>
            </nav>
        </div>
    );
}


