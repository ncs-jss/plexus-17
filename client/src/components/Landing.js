import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1> Plexus-17 ! </h1>
        Under Development
        <br />
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}
export default Landing;
