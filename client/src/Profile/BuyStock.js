import React, { Component } from "react";

export default class BuyStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
      quantity: 1,
      success: "",
      alert: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onBuy = this.onBuy.bind(this);
  }

  componentDidMount() {}

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onBuy(event) {
    event.preventDefault();
    // Grab state
    const { symbol, quantity } = this.state;
    // // Post request to backend
    fetch("http://localhost:5000/api/user/stocks/buy", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: symbol,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          this.setState({
            success: data.message,
          });
        } else {
          this.setState({
            alert: data.message,
          });
        }
      })
      .catch((e) => {
        this.setState({
          alert: "Error: Invalid credentials.",
        });
      });
  }

  render() {
    const { symbol, quantity } = this.state;

    return (
      <div className="">
        <h1 className="display-6 center">Buy a Stock</h1>
        <hr></hr>
        {this.state.success !== "" ? (
          <div
            className="alert alert-success alert-dismissible fade show py-0 px-5"
            role="alert"
          >
            {this.state.success}
            <button
              type="button"
              class="close py-0"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
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
              class="close py-0"
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
              <span className="input-group-text">Quantity:</span>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={this.handleChange("quantity")}
              ></input>
            </div>
            <button onClick={this.onBuy} className="btn btn-secondary">
              Buy Stock
            </button>
          </form>
        </div>
      </div>
    );
  }
}
