import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import styles from './Logo.css';
import logo from '../../../common/images/logo.png';

class Logo extends Component {
  componentDidMount() {}

  renderBreadCrumb() {
    return (
      <span>
        <Switch>
          <Route exact path="/" />
          <Route
            render={() => {
              return (
                <span>
                  <span> / </span>
                  <Route
                    exact
                    path="/"
                    render={props => {
                      return <span>Events</span>;
                    }}
                  />
                  <Route
                    path="/events/:name"
                    render={props => {
                      return <span style={{textTransform: 'capitalize', color: 'var(--default-color)'}}>{props.match.params.name}</span>;
                    }}
                  />
                </span>
              );
            }}
          />
        </Switch>
      </span>
    );
  }

  render() {
    return (
      <div>
        <span className={styles.logo}><img className={styles.logoImage} src={logo} alt="Plexus" /> </span>
        {this.renderBreadCrumb()}
      </div>
    );
  }
}

export default Logo;
