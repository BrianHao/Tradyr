import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PageNotFound extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="window center">
        <h1 className="display-3">Page Not Found</h1>
        <small className="text-muted">
          Looks like you've taken a wrong turn. Click <Link to="/">here</Link>{" "}
          to go home.{" "}
        </small>
      </div>
    );
  }
}
