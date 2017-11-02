import React, { Component } from 'react';

import EventItem from './EventItem/EventItem';

class Event extends Component {
  constructor(props) {
    super(props);
    this.eventLinks = [
      {
        text: 'Errata',
        url: '/errata'
      },
      {
        text: 'Sherlocked',
        url: '/sherlocked'
      },
      {
        text: 'Khoj',
        url: '/khoj'
      }
    ];
    const { match } = props;
    this.baseUrl = match.url + 'events';
  }

  renderEventItems() {
    return this.eventLinks.map((event, index) => {
      return (
        <EventItem baseUrl={this.baseUrl} event={event} key={index}></EventItem>
      );
    });
  }

  render() {
    return (
      <div style={{paddingLeft: '20px'}}>
        <div className='row'>
          {this.renderEventItems()}
        </div>
      </div>
    );
  }
}

export default Event;
