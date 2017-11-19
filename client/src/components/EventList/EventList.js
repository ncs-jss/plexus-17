import React, { Component } from 'react';

import EventItem from './EventItem/EventItem';

class Event extends Component {
  constructor(props) {
    super(props);
    this.eventLinks = [
      {
        id: 0,
        text: 'Errata',
        url: '/errata'
      },
      {
        id: 1,
        text: 'Sherlocked',
        url: '/sherlocked'
      },
      {
        id: 2,
        text: 'Khoj',
        url: '/khoj'
      }
    ];
    const { match } = props;
    this.baseUrl = match.url + 'events';
  }

  renderEventItems() {
    return this.eventLinks.map(event => {
      return <EventItem baseUrl={this.baseUrl} event={event} key={event.id} />;
    });
  }

  render() {
    return (
      <div>
        <div className="row">{this.renderEventItems()}</div>
      </div>
    );
  }
}

export default Event;
