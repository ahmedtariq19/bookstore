import React, { Component } from "react";
import axios from "axios";

class ProfileIcon extends Component {
    constructor(props) {
        super(props);
        this.state = { route: "/signup" };
    }

    componentDidMount() {
        axios.get("http://localhost:3001/user/checkLoggedIn").then(response => {
            if (response.data) {
                this.setState({ route: "/profile" });
            }
        });
    }

    render() {
        return (
            <a href={this.state.route}>
                <i className="fa fa-user-circle-o fa-2x" aria-hidden="true" />
            </a>
        );
    }
}

export default ProfileIcon;
