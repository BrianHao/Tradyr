import React from "react";
import "./App.js";
import { Redirect } from "react-router-dom";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedOut: false,
    };
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  render() {
    if (this.state.loggedOut) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }

    return (
      <div className="fixed-top shadow">
        <nav className="navbar navbar-dark bg-dark justify-content-center">
          <a className="navbar-brand h-1 mr-2" href="/">
            Tradyr {sessionStorage.getItem("id")}
          </a>
          <button
            className="btn btn-outline-success"
            onClick={() => this.logout()}
          >
            Log Out
          </button>
        </nav>
      </div>
    );
  }
}
