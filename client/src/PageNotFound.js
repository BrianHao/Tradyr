import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class PageNotFound extends Component {
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
            pathname: "/profile",
            state: {
              justLoggedIn: false,
            },
          }}
        />
      );
    }

    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
}
