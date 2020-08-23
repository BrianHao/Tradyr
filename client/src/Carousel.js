// Carousel for Landing Page
import React from "react";
import "./App.js";

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container-fluid">
        <div id="carouselId" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#carouselId"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselId" data-slide-to="1"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active img-container">
              <img
                src={require("./images/page-1.jpg")}
                className="d-block w-100"
                alt="dashboard-demo-image"
              ></img>
            </div>
            <div className="carousel-item img-container">
              <img
                src={require("./images/page-2.jpg")}
                className="d-block w-100"
                alt="transactions-demo-image"
              ></img>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselId"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselId"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}
