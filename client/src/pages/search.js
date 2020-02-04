import React, { Component } from "react";
import API from "../utils/API";
import SearchForm from "../components/SearchPlayers";
import SearchResults from "../components/SearchPlayersResults";


class Search extends Component {
  state = {
    search: "",
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    // API.getBaseBreedsList()
    //   .then(res => this.setState({ breeds: res.data.message }))
    //   .catch(err => console.log(err));
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // API.getDogsOfBreed(this.state.search)
    //   .then(res => {
    //     if (res.data.status === "error") {
    //       throw new Error(res.data.message);
    //     }
    //     this.setState({ results: res.data.message, error: "" });
    //   })
    //   .catch(err => this.setState({ error: err.message }));
  };
  render() {
    return (
      <div>
          <h1 className="text-center">Search By Breed!</h1>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            breeds={this.state.breeds}
          />
          <SearchResults results={this.state.results} />
    
      </div>
    );
  }
}

export default Search;