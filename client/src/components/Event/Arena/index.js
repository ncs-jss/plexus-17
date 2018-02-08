import React, { Component } from 'react';

class Arena extends Component {
  submitAns() {
    console.log('ans');
  }
  renderQuestion() {
    return <p>I am a sample Question</p>;
  }
  renderInput() {
    const inputTypeMap = {
      shortAns() {
        return <input type="text" placeholder="Enter Your Ans" />;
      },
      para() {
        return <textarea />;
      },
      options() {
        return (
          <select>
            <option />
            <option />
            <option />
          </select>
        );
      },
      file() {
        return <input type="file" />;
      }
    };

    let inputType = 'shortAns';
    return inputTypeMap[inputType]();
  }
  render() {
    return (
      <div>
        {this.renderQuestion()}
        {this.renderInput()}
        <button className="btn btn-primary" onClick={this.submitAns}>
          Submit
        </button>
      </div>
    );
  }
}

export default Arena;
