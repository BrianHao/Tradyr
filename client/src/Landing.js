import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    if (sessionStorage.getItem("loggedIn")) {
      return (
        <Redirect
          to={{
            pathname: "/user/dashboard",
          }}
        />
      );
    }

    return (
      <div className="window center container-md">
        <h1 className="display-1">Welcome to Tradyr</h1>
        <small className="text-muted">
          A simple to use web-based stock portfolio app.
        </small>
        <hr></hr>
        <small className="text-muted">
          <Link to="/login">Log in</Link> to get started.
        </small>
        <br></br>
        <small className="text-muted">
          Don't have an account? <Link to="/signup">Click here</Link> to create
          one now!
        </small>
      </div>
    );
  }
}
