import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../common/css/base.css';

import Header from './Header/Header';
import Landing from './Landing';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
