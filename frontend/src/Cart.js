import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { throws } from "assert";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            totalPrice: 0
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/cart/getCart")
            .then(response => {
                for (let order in response.data.items) {
                    this.state.orders.push(response.data.items[order]);
                }
                this.setState({ totalPrice: response.data.totalPrice });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let orders = this.state.orders;
        let ordersList = orders.map(order => {
            return (
                <div className="row">
                    <div className="order-info">
                        <img src={require("." + order.item.thumbnailLink)} />
                        <span>
                            <h3>{order.item.title}</h3>
                            <p>{order.item.metadata.authors[0].name}</p>
                        </span>
                        <span className="qty-price">
                            Quantity: {order.qty} | Price: {order.price}
                        </span>
                    </div>
                </div>
            );
        });
        return (
            <div className="cart-container">
                <div className="cart-main">
                    <div className="cart-content">
                        {ordersList}
                        <div className="row" id="totalPrice">
                            <h3>Total: {this.state.totalPrice} USD</h3>
                            <button className="btn btn-warning">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cart-recommendation" />
            </div>
        );
    }
}

export default Cart;
