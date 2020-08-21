import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className="window">
        <h1 className="display-1">Welcome to Tradyr</h1>
        <small class="text-muted">
          <Link to="/login">Log in</Link> now to get started.
        </small>
        <br></br>
        <small class="text-muted">
          Don't have an account? <Link to="/signup">Click here</Link> to create
          one now!
        </small>
        <hr></hr>
      </div>
    );
  }
}
