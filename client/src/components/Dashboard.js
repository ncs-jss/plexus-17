import React, { Component } from 'react';

const style = {
  wrapper: {
    fontSize: '30px',
    color: '#fff'
  }
};

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div style={style.wrapper}>Dashboard</div>
        <button className="btn btn-primary">Button</button>
      </div>
    );
  }
}
export default Dashboard;
