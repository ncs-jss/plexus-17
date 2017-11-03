import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './EventItem.css';

class EventItem extends Component {
  render() {
    const { url, text } = this.props.event;
    return (
      <div className="col-sm-6">
        <h2 style={{ marginBottom: '4px' }}>{text}</h2>
        <p style={{ marginBottom: '4px' }}>Status</p>
        <p className={styles.eventText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s.
        </p>
        <Link className="btn btn-outline-primary" style={{ marginBottom: '15px' }} to={`${this.props.baseUrl}${url}`}>
          Participate
        </Link>
      </div>
    );
  }
}

export default EventItem;
