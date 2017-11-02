import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Event extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Route
          path={`${match.path}/:name`}
          render={({ match }) => (
            <div>
              <h3> {match.params.name} </h3>
            </div>
          )}
        />
      </div>
    );
  }
}

export default Event;
