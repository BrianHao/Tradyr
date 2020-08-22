import React from "react";
import "./App.js";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <nav className="navbar navbar-dark bg-dark justify-content-center shadow">
          <span className="navbar-brand display-6 mr-2" href="/">
            ©2020 Brian Hao
          </span>

          <a href="https://github.com/brianhao" className="boardbutton mr-2">
            <i className="fab fa-github mr-0"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/brianhao/"
            className="boardbutton mx-0"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <div className="navbar-brand display-6 mx-3">|</div>
          <a className="text-muted" href="https://iexcloud.io">
            Data provided by IEX Cloud
          </a>
        </nav>
      </div>
    );
  }
}
