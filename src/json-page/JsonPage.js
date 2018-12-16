import React from "react";
import { BrowserRouter as Router, Route, Link, IndexRoute } from "react-router-dom";

import Sidebar from "../common/Sidebar";
import ContentPanel from "./ContentPanel";
import { SIDEBAR_LINKS } from "./JsonPage.props";

export default class JsonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid">
        <Router>
          <div className="row">
            <div className="col-lg-2 pl-0">
              <Sidebar SIDEBAR_LINKS={SIDEBAR_LINKS} />
            </div>
            <div className="col-lg-10">
              <ContentPanel />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}