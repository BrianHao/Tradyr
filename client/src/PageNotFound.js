import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PageNotFound extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className="window">
        <h1 className="display-3">Page Not Found</h1>
        <small class="text-muted">
          Looks like you've taken a wrong turn. Click <Link to="/">here</Link>{" "}
          to go home.{" "}
        </small>
      </div>
    );
  }
}
