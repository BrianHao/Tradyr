import React, { Component } from "react";

export default class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1> {this.props.stock.symbol}</h1>
      </div>
    );
  }
}
