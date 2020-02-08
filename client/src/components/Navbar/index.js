import React from 'react';

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
                <a className="navbar-brand" style={styles.headerFont} href="/">eQuipt</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a style={styles.font} className="navbar-brand nav-link" href="/login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a style={styles.font} className="navbar-brand nav-link" href="/searchPlayers">
                                Search
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a style={styles.font} className="navbar-brand nav-link" href="/Inventory">
                                Inventory
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a style={styles.font} className="navbar-brand nav-link" href="/give">
                                Give
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a style={styles.font} className="navbar-brand nav-link" href="/trade">
                                Trade
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a style={styles.font} className="navbar-brand nav-link" href="/create">
                                Create
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}


