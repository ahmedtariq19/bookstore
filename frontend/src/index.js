import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SearchBar from "./searchBar";
import CartIcon from "./cartIcon";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<SearchBar />, document.getElementById("search-bar"));
ReactDOM.render(<CartIcon />, document.getElementById("cart-icon"));

serviceWorker.unregister();
