// Login Page
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
      message: "",
      alert: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("loggedIn") === "true") {
      this.setState({ isLoggedIn: true });
    }
    if (this.props.location.state && this.props.location.state.justSignedUp) {
      this.setState({ message: "Successfully signed up! You may now log in." });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // Handle Log In
  onLogIn(event) {
    event.preventDefault();
    const { email, password } = this.state;
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
        window.location.reload();
      })
      .catch((e) => {
        this.setState({
          alert: "Error: Invalid credentials.",
        });
      });
  }

  render() {
    const { email, password, isLoggedIn, message, alert } = this.state;

    if (isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/user/dashboard",
          }}
        />
      );
    }

    return (
      <div className="window-s container-sm">
        <h1 className="display-3 center">Log In</h1>
        <hr></hr>
        {message ? (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        ) : null}
        {alert !== "" ? (
          <div className="alert alert-danger" role="alert">
            {alert}
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
