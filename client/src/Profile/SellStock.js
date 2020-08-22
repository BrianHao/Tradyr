import React, { Component } from "react";

export default class SellStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
      quantity: 1,
      success: "",
      alert: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSell = this.onSell.bind(this);
  }

  componentDidMount() {}

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSell(event) {
    event.preventDefault();
    // Grab state
    const { symbol, quantity } = this.state;
    // // Post request to backend
    fetch("http://localhost:5000/api/user/stocks/sell", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: symbol,
        quantity: parseInt(quantity, 10),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          this.setState({
            success: data.message,
          });
          window.location.reload();
        } else {
          this.setState({
            alert: data.message,
          });
        }
      })
      .catch((e) => {
        this.setState({
          alert: e.message,
        });
      });
  }

  render() {
    const { symbol, quantity } = this.state;

    return (
      <div className="">
        <h1 className="display-6 m-0 center">Sell Stock</h1>
        <hr className="mt-0"></hr>
        {this.state.success !== "" ? (
          <div className="alert alert-success p-0" role="alert">
            {this.state.success}
          </div>
        ) : null}
        {this.state.alert !== "" ? (
          <div
            className="alert alert-danger alert-dismissible fade show py-0 px-5"
            role="alert"
          >
            {this.state.alert}
            <button
              type="button"
              className="close py-0"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
        <div>
          <form>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">Stock Symbol:</span>
              <input
                type="text"
                className="form-control"
                placeholder="AAPL"
                value={symbol}
                onChange={this.handleChange("symbol")}
              ></input>
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">Quantity to Sell:</span>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={this.handleChange("quantity")}
              ></input>
            </div>
            <button onClick={this.onSell} className="btn btn-secondary">
              Sell Stock
            </button>
          </form>
        </div>
      </div>
    );
  }
}
