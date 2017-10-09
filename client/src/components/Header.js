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
            <nav>
                <div className="nav-wrapper">
                    <Link className="left brand-logo" to={ this.props.auth ? '/dashboard' : '/' }>Home</Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
};

const mapStateToProps = ({auth}) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);
