import React from 'react'
const styles = {
    background: {
        backgroundColor: "rgba(0,0,0,.7)",
    },
}
export default function Nav() {
    return (
        <div>
            <nav style={styles.background} className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    eQuipt
                </a>
                <a className="navbar-brand" href="/login">
                    Login
                </a>
            </nav>
        </div>
    )
}
