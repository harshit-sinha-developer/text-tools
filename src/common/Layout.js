import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./Header";
import PageBody from "./PageBody";

export default class Layout extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid pl-0">
          <Header />
          <PageBody />
        </div>
      </Router>
    )
  }
}
