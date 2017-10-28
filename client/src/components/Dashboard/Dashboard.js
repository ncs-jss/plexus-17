import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div>Dashboard</div>
        <button className={`${styles.btn} btn btn-primary`}>Button</button>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
export default Dashboard;
