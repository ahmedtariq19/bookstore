import React, { Component } from "react";
import axios from "axios";
import "./App.css";

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
                let tmp = [];
                for (let order in response.data.items) {
                    tmp.push(response.data.items[order]);
                }
                this.setState({
                    orders: tmp,
                    totalPrice: response.data.totalPrice.toFixed(2)
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    addOne(uid) {
        axios
            .get("http://localhost:3001/cart/add-to-cart/" + uid)
            .then(response => {
                let tmp = [];
                for (let order in response.data.items) {
                    tmp.push(response.data.items[order]);
                }
                this.setState({
                    orders: tmp,
                    totalPrice: response.data.totalPrice.toFixed(2)
                });
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
                            <p>By {order.item.metadata.authors[0].name}</p>
                        </span>
                        <div className="tools">
                            <button class="btn btn-success" aria-label="Remove">
                                Remove
                            </button>
                            <button
                                class="btn btn-success"
                                aria-label="+1"
                                onClick={() => {
                                    this.addOne(order.item.uid);
                                    this.props.increaseCount();
                                }}
                            >
                                +1
                            </button>
                            <button class="btn btn-success" aria-label="-1">
                                -1
                            </button>
                        </div>
                        <span className="qty-price">
                            Quantity: {order.qty} | Price:{" "}
                            {order.price.toFixed(2)}
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
