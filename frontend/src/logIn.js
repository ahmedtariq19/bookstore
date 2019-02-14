import React, { Component } from "react";
import "./signup.css";
import axios from "axios";
import { Redirect } from "react-router";
import "./signup.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", redirect: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        if (!this.state.username || !this.state.password) {
            alert("Username and Password cannot be blank");
            return;
        }
        axios
            .post("http://localhost:3001/user/login", {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    alert("Successfully Logged In");
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
            return <Redirect to="/" />;
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
                        Log In
                    </button>
                    <a href="/signup" className="signup-link">
                        <strong>Sign Up</strong>
                    </a>
                </div>
            </div>
        );
    }
}

export default Login;
