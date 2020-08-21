import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Moment from "moment";
import Stock from "./Stock";
import BuyStock from "./BuyStock";
import SellStock from "./SellStock";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      stockInfo: {},
      alert: "",
      cash: 0,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("loggedIn")) {
      console.log("fetching");
      const url = "http://localhost:5000/api/user/profile";
      fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            let cash = (data.user.cash / 100).toFixed(2);
            this.setState({
              user: data.user,
              stockInfo: data.stockInfo,
              cash: cash,
            });
          } else {
            this.setState({
              alert: data.message,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            alert: "Error: Unable to load profile information.",
          });
        });
    }
  }

  render() {
    if (!sessionStorage.getItem("loggedIn")) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }

    return (
      <div className="window center">
        <h1 className="display-3 m-0">Your Profile</h1>
        <h1 className="display-6 m-0">
          {this.state.user.name} ({this.state.user.username})
        </h1>
        <small className="text-muted">
          Account created:{" "}
          {Moment(this.state.user.created).format("MMMM Do YYYY, h:mm:ss a")}
        </small>
        <hr></hr>
        <h1 className="display-5">Cash on hand: ${this.state.cash}</h1>
        <hr></hr>
        <div className="container">
          <div className="row align-items-start">
            <div className="col container">
              <div className="col pane">
                <BuyStock />
              </div>
              <div className="col pane">Sell</div>
            </div>
            <div className="col">
              <div className="col pane">Stocks</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
