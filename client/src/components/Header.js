import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google"> Login With Google </a></li>
                );
            default:
                return (
                    [
                        <li key="3"><a className="btn pink" href="/api/logout"> Log Out </a></li>
                   ]
                );
        }
    }
    render() {
        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">Brand</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li className="active"><a href="/">Link <span className="sr-only">(current)</span></a></li>
                    <li><a href="/">Link</a></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    {this.renderContent()}
                  </ul>
                </div>
              </div>
            </nav>
        )
    }
};

const mapStateToProps = ({auth}) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);
