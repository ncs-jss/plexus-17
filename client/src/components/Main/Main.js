import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import styles from './Main.css';
import EventList from '../EventList/EventList';
import Event from '../Event/Event';

class Main extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.container} container`}>
          <div className={`${styles.leftSidebarWrapper} col-sm-4`}>
            <div className={styles.leftSidebar}>
            </div>
          </div>
          <div className='col-sm-8'>
            <Route exact path="/" component={EventList} />
            <Route path="/events" component={Event} />
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
