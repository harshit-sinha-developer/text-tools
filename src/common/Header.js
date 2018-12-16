import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { HEADER_LINKS, SITE_TITLE } from "./common.props";
import styles from "./styles/Header.less";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLinkId: null
    };

    this.headerLinkClicked = this.headerLinkClicked.bind(this);
    this.getHeaderLinks = this.getHeaderLinks.bind(this);
  }

  componentDidMount() {
    this.setState({ activeLinkId: HEADER_LINKS[0].uniqueKey })
  }

  headerLinkClicked(event) {
    let linkElement = event.currentTarget;
    let linkUniqueKey = linkElement.getAttribute('data-key');
    this.setState({ activeLinkId: linkUniqueKey });
  }

  getHeaderLinks() {
    return HEADER_LINKS.filter(linkObj => linkObj.displayLink).map(linkObj => {
      return (
        <li className={'nav-item ' + (linkObj.uniqueKey == this.state.activeLinkId ? 'active' : '')} key={linkObj.uniqueKey} data-key={linkObj.uniqueKey} onClick={this.headerLinkClicked}>
          <Link className="nav-link" to={linkObj.address}>{linkObj.display}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={styles.app_header}>
        <nav className={"navbar navbar-expand-lg pl-0 navbar-dark bg-dark fixed-top " + styles.app_nav}>
          <div className="container-fluid">
            <a className={"navbar-brand " + styles.app_title} href={SITE_TITLE.address}>{SITE_TITLE.display}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                {this.getHeaderLinks()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}