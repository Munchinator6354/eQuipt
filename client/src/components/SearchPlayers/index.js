import React from 'react'
import background from "../../images/Search.jpg";

export default function SearchPlayers(props) {
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
            fontFamily: "Almendra SC, serif"
        }
    }
    return (
        <div style={styles.background}>
            <div className="container" style={styles.center}>
        <br />
        <h1 style={styles.font} className="fadeUp">Search a Player</h1>
        <form className="search">
        <div className="form-group">
        <br />
          <label style={styles.labelFont} className="fadeUp" htmlFor="searchPlayer">Players User Name</label>
          <input
            value={props.search}
            onChange={props.handleInputChange}
            name="searchPlayer"
            type="text"
            className="form-control fadeUp"
            placeholder="Type in a username to search"
            id="searchPlayer"
          />
          {/* <datalist id="breeds">
            {props.breeds.map(breed => (
              <option value={breed} key={breed} />
            ))}
          </datalist> */}
          <br />
          <button type="submit" style={styles.buttonFont} onClick={props.handleFormSubmit} className="btn btn-outline-light fadeUp">
            Search
          </button>
        </div>
      </form>
      </div>
      </div>
    )
}
