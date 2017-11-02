import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventItem extends Component {
  render() {
    const { url, text } = this.props.event;
    return (
      <div className='col-sm-6'>
        <h2>{text}</h2>
        <Link className='btn btn-outline-primary' to={`${this.props.baseUrl}${url}`}>Participate</Link>
      </div>
    )
  }
}

export default EventItem;
