import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import styles from './Logo.css';

class Logo extends Component {
  componentDidMount() {}

  renderBreadCrumb() {
    return (
      <span>
        <Switch>
          <Route exact path="/" />
          <Route render={() => {
            return (
              <span>
                <span> / </span>
                <Route exact path="/events" render={props => {
                  return <span>Events</span>
                }} />
                <Route path="/events/:name" render={props => {
                  return <span>{props.match.params.name}</span>
                }}/>
              </span>
            );
          }} />
        </Switch>
      </span>
    );
  }

  render() {
    return (
      <div>
        <span className={styles.logo}>Plexus </span>
        {this.renderBreadCrumb()}
      </div>
    );
  }
}

export default Logo;