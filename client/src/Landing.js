// Landing Page
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Carousel from "./Carousel";

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
        <hr className="mb-1"></hr>
        <div className="img-container">
          <img
            src={
              "https://api.time.com/wp-content/uploads/2020/02/zoom-zm-stocks-coronavirus.jpg"
            }
            className="d-block w-100"
            alt="dashboard-demo"
          ></img>
        </div>
        <hr className="mt-1"></hr>
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
