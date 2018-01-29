import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getEvent } from '../../actions/event.action';
import Participate from './Participate';

class DataLoader extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.eventName);
  }
  render() {
    return null;
  }
}

class Event extends Component {
  render() {
    const { match, getEvent, event } = this.props;
    return (
      <div>
        <Route
          path={`${match.path}/:name`}
          render={({ match }) => (
            <div>
              <h3> {match.params.name} </h3>
              <DataLoader eventName={match.params.name} getEvent={getEvent} />
              <Participate eventId={event.eventGet.data._id} />
            </div>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({ event });

export default connect(mapStateToProps, {
  getEvent
})(Event);
