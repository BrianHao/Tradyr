// Navbar Component
import React from "react";
import "./App.js";
import { Redirect } from "react-router-dom";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loggedOut: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("loggedIn") === "true") {
      this.setState({ isLoggedIn: true });
    }
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
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark py-0">
          <div className="container-fluid">
            <div id="left-side">
              <a className="navbar-brand" href="/">
                <i className="fas fa-chart-line"></i>
                Tradyr
              </a>
            </div>

            <div id="right-side">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {this.state.isLoggedIn ? ( // Navbar items if user is logged in
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <span className="navbar-text mx-2 text-light">
                    Welcome, {sessionStorage.getItem("name")}!
                  </span>
                  <div className="navbar-nav">
                    <a className="nav-link" href="/user/dashboard">
                      <i className="fas fa-columns mr-1"></i>Dashboard
                    </a>
                    <a className="nav-link" href="/user/transactions">
                      <i className="far fa-list-alt mr-1"></i>
                      Transactions
                    </a>
                    <button
                      className="btn btn-sm btn-secondary py-0 px-1 m-1"
                      onClick={() => this.logout()}
                    >
                      <span className="m-0 px-1">
                        <i className="fas fa-sign-out-alt mr-1"></i>Log Out
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                // Navbar items if user is logged out
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <span className="navbar-text mx-2 text-light">
                    Welcome, Guest!
                  </span>
                  <div className="navbar-nav">
                    <a
                      className="nav-link btn btn-sm btn-secondary py-0 px-1 m-1"
                      href="/login"
                    >
                      <i className="fas fa-sign-in-alt mr-1"></i>Log In
                    </a>
                    <a
                      className="nav-link btn btn-sm btn-secondary py-0 px-1 m-1"
                      href="/signup"
                    >
                      <i className="fas fa-user-plus mr-1"></i>Sign Up
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
