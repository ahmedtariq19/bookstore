import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import AllBooks from "./all-books";
import SearchResults from "./searchResults";
import BookInfo from "./bookInfo";
import SearchBar from "./searchBar";
import CartIcon from "./cartIcon";
import LoginIcon from "./loginIcon";
import Cart from "./Cart";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.addToCart = this.addToCart.bind(this);
        this.increaseCount = this.increaseCount.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:3001/getCartQty/").then(response => {
            this.setState({ count: response.data });
        });
    }

    addToCart = uid => {
        axios
            .get("http://localhost:3001/cart/add-to-cart/" + uid)
            .then(response => {
                this.setState({
                    count: response.data.totalQty
                });
            });
    };

    increaseCount = () => {
        // Increase cartIcon count by one from cart view.
        let newCount = this.state.count + 1;
        this.setState({ count: newCount });
    };

    render() {
        return (
            <div>
                <header className="header">
                    <h1 className="title">
                        <a href="/">Tao.co</a>
                    </h1>
                    <div className="search-form">
                        <SearchBar />
                    </div>
                    <nav className="navs">
                        <LoginIcon className="login-icon" />
                        <CartIcon
                            count={this.state.count}
                            className="cart-icon"
                        />
                    </nav>
                </header>
                <div className="container-fluid">
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <AllBooks addToCart={this.addToCart} />
                                )}
                            />
                            <Route
                                path="/books/:search"
                                render={props => (
                                    <SearchResults
                                        query={props.match.params.search}
                                    />
                                )}
                            />
                            <Route
                                path="/book/:uid"
                                render={props => (
                                    <BookInfo uid={props.match.params.uid} />
                                )}
                            />
                            <Route
                                path="/cart"
                                render={() => (
                                    <Cart increaseCount={this.increaseCount} />
                                )}
                            />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
