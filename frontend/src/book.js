import React, { Component } from "react";
import { BrowserRouter, withRouter } from "react-router-dom";
import "./book.css";
import axios from "axios";

axios.defaults.withCredentials = true;

class Book extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Image = withRouter(({ history }) => (
            <img
                src={require("." + this.props.data.thumbnailLink)}
                height="auto"
                width="100%"
                alt={this.props.data.thumbnailLink}
                onClick={() => {
                    history.push("/book/" + this.props.data.uid);
                }}
            />
        ));

        return (
            <div className="book-container">
                <div className="book-left">
                    <BrowserRouter forceRefresh={true}>
                        <Image />
                    </BrowserRouter>
                </div>
                <div className="book-right">
                    <div className="metadata">
                        <h3>{this.props.data.title}</h3>
                        <br />
                        By
                        <br />
                        <i>
                            <strong>
                                {this.props.data.metadata.authors[0].name}
                            </strong>
                        </i>
                        <br />
                        <br />
                        Price:
                        <br />
                        <i>
                            <strong>${this.props.data.price}</strong>
                        </i>
                    </div>
                    <div className="select-btn">
                        <div className="btn">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    this.props.addToCart(this.props.data.uid);
                                }}
                            >
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Book;
