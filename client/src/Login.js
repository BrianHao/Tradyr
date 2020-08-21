import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      justLoggedIn: false,
      justSignedUp: false,
      alert: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
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

  onLogIn(event) {
    event.preventDefault();
    // Grab state
    const { email, password } = this.state;
    // // Post request to backend
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return data;
        } else {
          this.setState({
            alert: data.message,
          });
        }
      })
      .then((user) => {
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("loggedIn", "true");
      })
      .then(() => {
        this.setState({ isLoggedIn: true, justLoggedIn: true });
      })
      .catch((e) => {
        this.setState({
          alert: "Error: Invalid credentials.",
        });
      });
  }

  render() {
    const { email, password, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/profile",
            state: {
              justLoggedIn: this.state.justLoggedIn,
            },
          }}
        />
      );
    }

    return (
      <div className="window-s">
        <h1 className="display-3 center">Log In</h1>
        <hr></hr>
        {this.state.justSignedUp === true ? (
          <div className="alert alert-success" role="alert">
            Successfully signed up! You can now log in.
          </div>
        ) : null}
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
              <div id="emailHelp" className="form-text"></div>
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
            <button onClick={this.onLogIn} className="btn btn-primary">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}
