import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getEvent } from '../../actions/event.action';
import Arena from './Arena';
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
  onParticipate = ({ success }) => {
    if (success) {
      const redirectUrl = `/events/${this.props.event.eventGet.data.name}/arena`;
      this.props.history.push(redirectUrl);
    }
    console.log('success', success);
  };
  renderRules(rules) {
    if (!rules) {
      return null;
    }
    return rules.map((rule, index) => <p key={index}>{rule}</p>);
  }
  render() {
    const { match, getEvent, event } = this.props;
    return (
      <div>
        <Route
          exact
          path={`${match.path}/:name`}
          render={({ match }) => (
            <div>
              <h3> {match.params.name} </h3>
              <DataLoader eventName={match.params.name} getEvent={getEvent} />
              {this.renderRules(event.eventGet.data.rules)}
              <Participate eventId={event.eventGet.data._id} onParticipate={this.onParticipate} />
            </div>
          )}
        />
        <Route path={`${match.path}/:name/arena`} render={() => <Arena />} />
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({ event });

export default connect(mapStateToProps, {
  getEvent
})(Event);
