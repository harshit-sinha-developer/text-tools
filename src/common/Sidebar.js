import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "./styles/SideBar.less";

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getSidebarLinks = this.getSidebarLinks.bind(this);
  }

  getSidebarLinks() {
    return this.props.SIDEBAR_LINKS.filter(linkObj => linkObj.displayLink).map(linkObj => {
      return (
        <li className={'nav-item'} key={linkObj.uniqueKey} data-key={linkObj.uniqueKey}>
          <Link className="nav-link" to={linkObj.address}>{linkObj.icon ? linkObj.icon : null}&nbsp;&nbsp;{linkObj.display}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={styles.app_sidebar}>
        <ul className="nav nav-tabs flex-column">
          {this.getSidebarLinks()}
        </ul>
      </div>
    );
  }
}