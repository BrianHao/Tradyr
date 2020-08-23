import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Transaction from "./Transaction";

export default class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      allTx: [],
      buysTx: [],
      sellsTx: [],
      alert: "",
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("loggedIn")) {
      const url = "http://localhost:5000/api/user/transactions";
      fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            this.setState({
              transactions: data.transactions,
            });
          } else {
            this.setState({
              alert: data.message,
            });
          }
          return data.transactions;
        })
        .then((transactions) => this.compileTxTables(transactions))
        .catch((e) => {
          this.setState({
            alert: e.message,
          });
        });
    }
  }

  compileTxTables(transactions) {
    let allTable = [];
    let buysTable = [];
    let sellsTable = [];
    let rowTx;
    for (let transaction of transactions) {
      rowTx = <Transaction key={transaction._id} transaction={transaction} />;
      allTable.unshift(rowTx);
      if (transaction.isBuy) {
        buysTable.unshift(rowTx);
      } else {
        sellsTable.unshift(rowTx);
      }
    }
    this.setState({ allTx: allTable, buysTx: buysTable, sellsTx: sellsTable });
  }

  makeTxIntoRow(tx) {
    return (
      <tr>
        <td>{tx.time}</td>
        <td>{tx.isBuy}</td>
        <td>{tx.symbol}</td>
        <td>{tx.quantity}</td>
        <td>{tx.price}</td>
      </tr>
    );
  }

  buildTable(display) {
    let retTable = [];

    if (display === "all") {
      retTable = this.state.allTx;
    } else if (display === "buys") {
      retTable = this.state.buysTx;
    } else {
      retTable = this.state.sellsTx;
    }

    return (
      <div className="overflow-auto table-height">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Symbol</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price (Per Share)</th>
            </tr>
          </thead>
          <tbody>{retTable}</tbody>
        </table>
        {retTable.length < 1
          ? "You don't have any transactions to display."
          : null}
      </div>
    );
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
      <div className="window center container-lg">
        <h1 className="display-1 mt-0">Transactions</h1>
        <hr className=""></hr>

        <div className="container-fluid">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-link active"
                id="nav-all-tab"
                data-toggle="tab"
                href="#nav-all"
                role="tab"
              >
                All Transactions
              </a>
              <a
                className="nav-link"
                id="nav-buys-tab"
                data-toggle="tab"
                href="#nav-buys"
                role="tab"
              >
                Buys Only
              </a>
              <a
                className="nav-link"
                id="nav-sells-tab"
                data-toggle="tab"
                href="#nav-sells"
                role="tab"
              >
                Sells Only
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-all"
              role="tabpanel"
            >
              {this.buildTable("all")}
            </div>
            <div className="tab-pane fade" id="nav-buys" role="tabpanel">
              {this.buildTable("buys")}
            </div>
            <div className="tab-pane fade" id="nav-sells" role="tabpanel">
              {this.buildTable("sells")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
