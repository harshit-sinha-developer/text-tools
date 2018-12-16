import React from "react";
import { BrowserRouter as Router, Route, Link, IndexRoute, Redirect } from "react-router-dom";

import { HEADER_LINKS } from "./common.props";
import Utility from "../lib/util";

export default class PageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getRoutes = this.getRoutes.bind(this);
  }

  getRoutes() {
    let routeList = HEADER_LINKS.filter(headerLinkObj => headerLinkObj.isRouteLink).map(headerLinkObj => {
      let redirectObj = {};
      if(headerLinkObj.redirect) {
        redirectObj.pathname = headerLinkObj.redirect
      }
      return (
        headerLinkObj.redirect ?
          <Route exact path={headerLinkObj.address} render={props => <Redirect to={redirectObj}/>} key={Utility.generateRandomString(5)}/> :
          <Route exact path={headerLinkObj.address} component={headerLinkObj.handlerComponent} key={Utility.generateRandomString(5)}/>
      );
    });

    return routeList;
  }

  render() {
    return (
      <div className="">
        {this.getRoutes()}
      </div>
    );
  }
}