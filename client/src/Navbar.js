import React from "react";
import "./App.js";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="fixed-top shadow">
        <nav className="navbar navbar-dark bg-dark justify-content-center">
          <span className="navbar-brand h-1 mr-2" href="/">
            Tradyr
          </span>
        </nav>
      </div>
    );
  }
}
