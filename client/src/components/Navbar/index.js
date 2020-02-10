import React from 'react';
import {Link} from 'react-router-dom';

const styles = {
    background: {
        backgroundColor: "rgba(0,0,0,.7)",
        // height: "5vh"
    },
    font: {
        // marginTop: "-1vh",
        fontSize: "1.15em",
        fontFamily: "Almendra SC, serif"
    },
    headerFont: {
        fontSize: "1.75em",
        fontFamily: "Almendra SC, serif"
    }
}
export default function Navbar() {
    return (
        <div>
            <nav style={styles.background} className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                    <Link to="/" style={styles.headerFont} className="navbar-brand">
                        eQuipt
                    </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/login" style={styles.font} className="navbar-brand nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/searchPlayers" style={styles.font} className = "navbar-brand nav-link">
                            Search
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/Inventory" style={styles.font} className = "navbar-brand nav-link">
                            Inventory
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/give" style={styles.font} className = "navbar-brand nav-link">
                            Give
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/trade"style={styles.font}  className = "navbar-brand nav-link">
                            Trade
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/create" style={styles.font} className = "navbar-brand nav-link">
                            Create
                            </Link>
                        </li>
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


