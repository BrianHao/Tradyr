import React, { Component } from "react";

export default class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousPrice: 0,
    };
  }

  componentDidMount() {
    const { stock } = this.props;
    this.setState({
      previousPrice: stock.open || stock.previousClose || stock.latestPrice,
    });
  }

  getLatestPrice() {
    const { stock } = this.props;
    const { previousPrice } = this.state;
    let price = stock.latestPrice.toFixed(2);
    let latest;
    let diff = (price - previousPrice).toFixed(2);
    if (stock.latestPrice > previousPrice) {
      latest = (
        <td className="text-success">
          <i className="fas fa-chevron-up"></i> ${price} ({diff})
        </td>
      );
    } else if (stock.latestPrice < previousPrice) {
      latest = (
        <td className="text-danger">
          <i className="fas fa-chevron-down"></i> ${price} ({diff})
        </td>
      );
    } else {
      latest = (
        <td className="text-secondary">
          ${price} ({diff})
        </td>
      );
    }
    return latest;
  }

  render() {
    const { stock } = this.props;
    return (
      <tr>
        <td>{stock.symbol}</td>
        <td>{stock.companyName}</td>
        <td>{stock.quantity}</td>
        {this.getLatestPrice()}
      </tr>
    );
  }
}

/*
<td>{stock.latestPrice}</td>
"symbol": "MSFT",
            "quantity": 1,
            "latestPrice": 213.02,
            "companyName": "Microsoft Corp.",
            "open": 213.86,
            "close": 213.02,
            "previousClose": 214.58
*/
