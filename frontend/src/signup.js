import React, { Component } from "react";
import "./signup.css";
import axios from "axios";
import { Redirect } from "react-router";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", redirect: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .post("http://localhost:3001/user/signup", {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    console.log("successful signup");
                    this.setState({
                        redirect: "true"
                    });
                }
            });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/profile" />;
        }
        return (
            <div className="signup-container">
                <div className="form">
                    <div className="label">
                        <p className="label-txt">ENTER YOUR EMAIL</p>
                        <input
                            type="text"
                            className="input"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <div className="line-box">
                            <div className="line" />
                        </div>
                    </div>
                    <div className="label">
                        <p className="label-txt">ENTER YOUR PASSWORD</p>
                        <input
                            type="password"
                            className="input"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div className="line-box">
                            <div className="line" />
                        </div>
                    </div>
                    <button type="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default Signup;
