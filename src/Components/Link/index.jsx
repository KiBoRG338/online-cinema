import React, { Component } from "react";
import { Link } from "react-router-dom";

class LinkTo extends Component {
    render() {
        return ( 
            <Link to={this.props.to}>
                {this.props.linkTitle}
            </Link>
        )
    }
}

export default LinkTo;