import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

class EventItem extends Component {
  render() {
    const { name, description, state } = this.props.event;
    return (
      <div className="col-sm-6">
        <h2 style={{ marginBottom: '4px' }}>{name}</h2>
        <p style={{ marginBottom: '4px' }}>{state}</p>
        <p className={styles.eventText}>{description}</p>
        <Link className="btn btn-outline-primary" style={{ marginBottom: '15px' }} to={`${this.props.baseUrl}/${name}`}>
          Participate
        </Link>
      </div>
    );
  }
}

export default EventItem;
