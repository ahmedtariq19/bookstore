import React, { Component } from "react";
import axios from "axios";
import "./bookInfo.css";

class BookInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                uid: "",
                title: "",
                description: "",
                metadata: {
                    authors: [{ name: "" }]
                },
                price: 0,
                thumbnailLink: "",
                type: ""
            },
            imgLink: ""
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/books/search/" + this.props.uid)
            .then(response => {
                this.setState({
                    data: response.data[0],
                    imgLink: require("." + response.data[0].thumbnailLink)
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="book-info container">
                <div className="book-info left" />
                <div className="book-info middle">
                    <div className="book-info middle info">
                        <figure className="book-info pic">
                            <img src={this.state.imgLink} alt="Cover" />
                        </figure>
                        <div className="book-info info">
                            <div className="book-info info text">
                                <h2>{this.state.data.title}</h2>
                                by{" "}
                                <strong>
                                    {this.state.data.metadata.authors[0].name}
                                </strong>
                                <br />
                                <br />
                                <strong>Description:</strong>
                                <br />
                                {this.state.data.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookInfo;
