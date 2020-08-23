import React, { Component } from "react";
import Moment from "moment";

export default class Transaction extends Component {
  componentDidMount() {}

  render() {
    const { transaction } = this.props;
    return (
      <tr>
        <td>{Moment(transaction.time).format("MMMM Do YYYY, h:mm:ss a")}</td>
        <td>{transaction.isBuy ? "Buy" : "Sell"}</td>
        <td>{transaction.symbol}</td>
        <td>{transaction.quantity}</td>
        <td>${(transaction.price / 100).toFixed(2)}</td>
      </tr>
    );
  }
}
