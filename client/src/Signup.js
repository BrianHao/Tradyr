import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      success: false,
      alert: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("loggedIn") === "true") {
      this.setState({ isLoggedIn: true });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSignUp(event) {
    event.preventDefault();
    // Grab state
    const { email, password, name } = this.state;
    // // Post request to backend
    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          this.setState({
            success: true,
          });
        } else {
          this.setState({
            alert: data.message,
          });
        }
      })
      .catch((e) => {
        this.setState({
          alert: "Error: Please provide the necessary information.",
        });
      });
  }

  render() {
    const { email, name, password, success, isLoggedIn } = this.state;

    if (isLoggedIn) {
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

    if (success) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              justSignedUp: true,
            },
          }}
        />
      );
    }

    return (
      <div className="window-s">
        <h1 className="display-3 center">Sign Up</h1>
        <hr></hr>
        {this.state.alert !== "" ? (
          <div className="alert alert-danger" role="alert">
            {this.state.alert}
          </div>
        ) : null}
        <div>
          <form>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="mickey@disney.com"
                value={email}
                onChange={this.handleChange("email")}
              ></input>
              <div id="emailHelp" className="form-text">
                You will be using your email address to log in.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="name"
                className="form-control"
                placeholder="Mickey"
                value={name}
                onChange={this.handleChange("name")}
              ></input>
              <div id="nameHelp" className="form-text">
                Your name or alias, whatever you'd like to be referred to as.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={this.handleChange("password")}
              ></input>
            </div>
            <button onClick={this.onSignUp} className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}
