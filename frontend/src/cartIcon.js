import React, { Component } from "react";
import axios from "axios";
import "./cartIcon.css";

class CartIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="cart">
                <i
                    className="fa fa-shopping-cart fa-2x has-badge"
                    aria-hidden="true"
                />
                <span className="badge badge-warning count">
                    {this.props.count}
                </span>
            </a>
        );
    }
}

export default CartIcon;
