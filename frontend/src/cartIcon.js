import React, { Component } from "react";
import axios from "axios";
import "./cartIcon.css";

class CartIcon extends Component {
    constructor(props) {
        super(props);
        this.state = { totalQty: 0 };
    }

    componentDidMount() {
        axios.get("http://localhost:3001/getCartQty").then(response => {
            console.log(response.data);
            this.setState({ totalQty: response.data });
        });
    }

    render() {
        return (
            <a href="cart">
                <i
                    className="fa fa-shopping-cart fa-2x has-badge"
                    aria-hidden="true"
                />
                <span className="badge badge-warning count">
                    {this.state.totalQty}
                </span>
            </a>
        );
    }
}

export default CartIcon;
