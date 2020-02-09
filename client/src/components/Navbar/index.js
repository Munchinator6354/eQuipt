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
                {/* <a className="navbar-brand" style={styles.headerFont} href="/"> */}
                <Link to="/" style={styles.font} className="navbar-brand nav-link">
                    eQuipt
                </Link>
                    {/* </a> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            {/* <a style={styles.font} className="navbar-brand nav-link" href="/login"> */}
                            <Link to="/login" style={styles.font} className="navbar-brand nav-link">
                                Login
                            </Link>
                            {/* </a> */}
                        </li>
                        <li className="nav-item active">
                            {/* <a style={styles.font} className="navbar-brand nav-link" href="/searchPlayers"> */}
                            <Link to="/searchPlayers" style={styles.font} className="navbar-brand nav-link">
                                Search
                            </Link>
                            {/* </a> */}
                        </li>
                        <li className="nav-item active">
                            {/* <a style={styles.font} className="navbar-brand nav-link" href="/Inventory"> */}
                            <Link to="/Inventory" style={styles.font} className="navbar-brand nav-link">
                                Inventory
                            </Link>
                            {/* </a> */}
                        </li>
                        <li className="nav-item active">
                            {/* <a style={styles.font} className="navbar-brand nav-link" href="/give"> */}
                            <Link to="/give" style={styles.font} className="navbar-brand nav-link">
                                Give
                            </Link>
                            {/* </a> */}
                        </li>
                        <li className="nav-item active">
                            {/* <a style={styles.font} className="navbar-brand nav-link" href="/trade"> */}
                            <Link to="/trade" style={styles.font} className="navbar-brand nav-link">
                                Trade
                            </Link>
                            {/* </a> */}
                        </li>
                        <li className="nav-item active">
                            {/* <a style={styles.font} className="navbar-brand nav-link" href="/create"> */}
                            <Link to="/create" style={styles.font} className="navbar-brand nav-link">
                                Create
                            </Link>
                            {/* </a> */}
                        </li>
                        <li className="nav-item active">
                            {/* <a style={styles.font} className="navbar-brand nav-link" href="/create"> */}
                            <Link to="/test" style={styles.font} className="navbar-brand nav-link">
                                Test
                            </Link>
                            {/* </a> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}


