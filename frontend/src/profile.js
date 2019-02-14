import React, { Component } from "react";
import axios from "axios";
import "./profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    componentDidMount() {
        axios.get("http://localhost:3001/user/getUser").then(response => {
            this.setState({ user: response.data });
        });
    }
    render() {
        return (
            <div className="profile">
                <h1>Hi, {this.state.user.email}</h1>
            </div>
        );
    }
}

export default Profile;
