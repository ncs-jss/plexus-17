import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import EventItem from './EventItem/EventItem';

class Event extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <ul>
          <li>
            <Link to={`${match.url}/errata`}>Errata</Link>
          </li>
          <li>
            <Link to={`${match.url}/sherlocked`}>Sherlocked</Link>
          </li>
          <li>
            <Link to={`${match.url}/khoj`}>Khoj</Link>
          </li>
        </ul>
        <Route path="/events" component={EventItem} />
      </div>
    );
  }
}

export default Event;
