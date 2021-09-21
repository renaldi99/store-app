import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavbarComponent } from "./Components/index";
import { Home, Success } from ".//Pages/index";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
      </Router>
    );
  }
}
