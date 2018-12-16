import React from "react";
import { BrowserRouter as Router, Route, Link, IndexRoute } from "react-router-dom";

import { SIDEBAR_LINKS } from "./JsonPage.props";
import Utility from "../lib/util";

export default class ContentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getRoutes = this.getRoutes.bind(this);
  }

  getRoutes() {
    let routesList = SIDEBAR_LINKS.map(sidebarObj => {
      return (
        <Route exact path={sidebarObj.address} component={sidebarObj.handlerComponent} key={Utility.generateRandomString(5)}/>
      )
    });

    return routesList;
  }

  render() {
    return (
      <div className="container-fluid">
        {this.getRoutes()}
      </div>
    );
  }
}