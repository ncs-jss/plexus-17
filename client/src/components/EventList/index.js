import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventItem from './EventItem';

import { listEvent } from '../../actions/event.action';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.props.listEvent({
      limit: 6,
      fields: {
        self: ['name', 'description', 'state']
      }
    });
    const { match } = props;
    this.baseUrl = match.url + 'events';
  }

  renderEventItems() {
    return this.props.event.map(event => {
      return <EventItem baseUrl={this.baseUrl} event={event} key={event._id} />;
    });
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <div className="row"> {this.renderEventItems()} </div>{' '}
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({ event });

export default connect(mapStateToProps, { listEvent })(EventList);

// export default EventList;
