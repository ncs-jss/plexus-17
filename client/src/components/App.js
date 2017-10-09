import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <div className="container">
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/dashboard" component={Dashboard} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};
export default connect(null, actions)(App);
