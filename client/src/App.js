import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./Landing";
import Profile from "./Profile/Profile";
import Signup from "./Signup";
import Login from "./Login";
import Transactions from "./Profile/Transactions";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/user/dashboard" component={Profile} />
          <Route
            exact={true}
            path="/user/transactions"
            component={Transactions}
          />
          <Route path="/*" component={Landing} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
