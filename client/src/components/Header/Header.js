import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Header.css';
import Logo from './Logo/Logo';

class Header extends Component {

  constructor(props) {
    super(props);
    this.navLinks = [{
      text: 'Home',
      url: '/home'
    }, {
      text: 'Events',
      url: '/events'
    }, {
      text: 'Leaderboard',
      url: '/leaderboard'
    }]
  }

  renderAuthButton() {
    console.log(this.props);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a className={`${styles.btn} btn btn-outline-default`} href="/auth/google">
              Login With Google
            </a>
          </li>
        );
      default:
        return (
          <li key="3">
            <a className={`${styles.btn} btn btn-outline-default`} href="/api/logout">
              Log Out
            </a>
          </li>
        );
    }
  }

  renderNavLinks() {
    return (
      this.navLinks.map(({text, url}) => {
        return (
          <li>
            <Link to={url}>
              {text}
            </Link>
          </li>
        );
      })
    );
  }

  render() {
    return (
      <nav className={`${styles.navbar} navbar`}>
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">
              <Logo/>
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className={`${styles.navbarRight} nav navbar-nav navbar-right`}>
              {this.renderNavLinks()}
              {this.renderAuthButton()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
