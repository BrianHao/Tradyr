// Profile => User Dashboard Page
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
      totalValue: 0,
      stocksList: [],
      stocksTable: [],
      alert: "",
      cash: 0,
    };
  }

  componentDidMount() {
    // Get uer's profile information
    if (sessionStorage.getItem("loggedIn")) {
      const url = "/api/user/profile";
      fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            let cash = data.user.cash;
            this.setState({
              user: data.user,
              stocksList: data.stockInfo,
              cash: cash,
            });
          } else {
            this.setState({
              alert: data.message,
            });
          }
        })
        .then(() => {
          let stocksTable = this.compileStocksTable(this.state.stocksList);
          this.setState({ stocksTable: stocksTable });
        })
        .catch((e) => {
          this.setState({
            alert: "Error: Unable to load profile information.",
          });
        });
    }
  }

  // Compile the table to show user's list of owned stocks
  compileStocksTable(stocks) {
    let stocksList = [];
    for (let stock of stocks) {
      if (stock.quantity > 0) {
        this.setState({
          totalValue:
            this.state.totalValue + stock.quantity * stock.latestPrice,
        });
        stocksList.push(<Stock key={stock.symbol} stock={stock} />);
      }
    }

    return stocksList;
  }

  render() {
    const { user, cash, stocksTable, totalValue } = this.state;

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
      <div className="window center container-lg">
        <h1 className="display-1 m-0">Dashboard</h1>
        <hr className="m-0"></hr>

        <h1 className="display-5 m-0">
          {user.name} ({user.username})
        </h1>
        <small className="text-muted">
          Account created:{" "}
          {Moment(user.created).format("MMMM Do YYYY, h:mm:ss A")}
        </small>

        <h1 className="display-6 m-0">Cash: ${(cash / 100).toFixed(2)}</h1>
        <hr className="mt-0"></hr>
        <div className="container-fluid">
          <div className="row align-items-start">
            <div className="col-sm-12 col-lg-4 col-xl-3 container-fluid">
              <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-5 col-lg-12 pane">
                  <BuyStock />
                </div>
                <div className="col-xs-12 col-sm-5 col-lg-12 pane">
                  <SellStock />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-8 col-xl-9">
              <div className="row">
                <div className="col pane">
                  <h1 className="display-6 m-0 center">
                    Your Portfolio{" "}
                    <span className="font-weight-lighter">
                      (${totalValue.toFixed(2)})
                    </span>
                  </h1>
                  <hr className="mt-0"></hr>
                  <div className="overflow-auto table-height">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Symbol</th>
                          <th scope="col">Company Name</th>
                          <th scope="col">Shares Owned</th>
                          <th scope="col">Latest Price</th>
                        </tr>
                      </thead>
                      <tbody>{stocksTable}</tbody>
                    </table>
                    {stocksTable.length < 1
                      ? "You don't own any stocks."
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
