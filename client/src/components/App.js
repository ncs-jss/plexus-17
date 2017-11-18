import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../common/css/base.css';

import Header from './Header/Header';
import Main from './Main/Main';

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }
};

class App extends Component {
  componentDidMount() {
    this.props.getLoginUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div style={styles.wrapper}>
            <Route path="/" component={Header} />
            <div className="container" style={{ flex: 1 }}>
              <Route path="/" component={Main} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
