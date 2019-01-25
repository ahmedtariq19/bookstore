import React, { Component } from "react";
import { BrowserRouter, withRouter } from "react-router-dom";
import "./searchBar.css";

class SearchBar extends Component {
  state = {
    query: ""
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  render() {
    const Button = withRouter(({ history }) => (
      <button
        type="button"
        className="btn btn-default"
        onClick={() => {
          if (!this.state.query) {
            history.push("/");
          } else {
            history.push("/books/" + this.state.query);
          }
        }}
      >
        <i className="fa fa-search" /> Search
      </button>
    ));

    return (
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          onChange={this.handleInputChange}
          ref={input => (this.search = input)}
        />
        <span className="input-group-btn">
          <BrowserRouter forceRefresh={true}>
            <Button />
          </BrowserRouter>
        </span>
      </div>
    );
  }
}

export default SearchBar;
