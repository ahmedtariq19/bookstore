import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, withRouter } from "react-router-dom";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            totalPrice: 0,
            recommendations: []
        };
    }

    componentDidMount() {
        Promise.all([
            axios.get("http://localhost:3001/cart/getCart"),
            axios.get("http://localhost:3001/books/getRandom")
        ]).then(([cartResponse, recommResponse]) => {
            let tmp = [];
            for (let order in cartResponse.data.items) {
                tmp.push(cartResponse.data.items[order]);
            }
            this.setState({
                orders: tmp,
                totalPrice: cartResponse.data.totalPrice.toFixed(2),
                recommendations: recommResponse.data
            });
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

    minusOne(uid) {
        axios
            .get("http://localhost:3001/cart/minusOne/" + uid)
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

    remove(uid) {
        axios
            .get("http://localhost:3001/cart/removeItem/" + uid)
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
        if (orders.length === 0) {
            return (
                <div className="cart-container">
                    <div className="cart-main">
                        <div className="cart-content empty">
                            <h2>No Items In Cart Yet.</h2>
                        </div>
                    </div>
                    <div className="cart-recommendation" />
                </div>
            );
        }
        let ordersList = orders.map(order => {
            return (
                <div className="row" key={order.item.uid}>
                    <div className="order-info">
                        <img
                            src={require("." + order.item.thumbnailLink)}
                            alt={order.item.thumbnailLink}
                        />
                        <span>
                            <h3>{order.item.title}</h3>
                            <p>By {order.item.metadata.authors[0].name}</p>
                        </span>
                        <div className="tools">
                            <button
                                className="btn btn-success"
                                aria-label="Remove"
                                onClick={() => {
                                    this.remove(order.item.uid);
                                    this.props.remove(order.item.uid);
                                }}
                            >
                                Remove
                            </button>
                            <button
                                className="btn btn-success"
                                aria-label="+1"
                                onClick={() => {
                                    this.addOne(order.item.uid);
                                    this.props.increaseCount();
                                }}
                            >
                                +1
                            </button>
                            <button
                                className="btn btn-success"
                                aria-label="-1"
                                onClick={() => {
                                    this.minusOne(order.item.uid);
                                    this.props.decreaseCount();
                                }}
                            >
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

        let recomm = this.state.recommendations;
        let recommList = recomm.map(rec => {
            const Image = withRouter(({ history }) => (
                <img
                    src={require("." + rec.thumbnailLink)}
                    alt={rec.thumbnailLink}
                    onClick={() => {
                        history.push("/book/" + rec.uid);
                    }}
                />
            ));
            return (
                <div className="row">
                    <div className="rec-container">
                        <BrowserRouter forceRefresh={true}>
                            <Image />
                        </BrowserRouter>

                        {/* <img
                            src={require("." + rec.thumbnailLink)}
                            alt={rec.thumbnailLink}
                        /> */}
                        <span className="rec-description">
                            <h4>{rec.title}</h4>
                            By {rec.metadata.authors[0].name}
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
                            <a
                                role="button"
                                className="btn btn-warning"
                                href="/checkout"
                            >
                                Proceed to Checkout
                            </a>
                        </div>
                    </div>
                </div>
                <div className="cart-recommendation">
                    <h4>Other viewers also viewed</h4>
                    {recommList}
                </div>
            </div>
        );
    }
}

export default Cart;
