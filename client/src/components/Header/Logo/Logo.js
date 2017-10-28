import React, { Component } from 'react';

import styles from './Logo.css';

class Logo extends Component {
    componentDidMount() {
    }

    renderContent() {
      return (
        <span className={styles.event}> / Errata</span>
      );
    }

    render() {
      return (
        <div>
          <span className={styles.logo}>Plexus</span>
          {this.renderContent()}
        </div>
      );
    }
}

export default Logo;
