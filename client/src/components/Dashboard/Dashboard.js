import React, { Component } from 'react';

import styles from './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div>Dashboard</div>
        <button className={`${styles.btn} btn btn-primary`}>Button</button>
      </div>
    );
  }
}
export default Dashboard;
