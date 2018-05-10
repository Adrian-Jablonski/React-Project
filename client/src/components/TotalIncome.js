import React, { Component } from 'react';

class TotalIncome extends Component {

  render() {
    return (
      <div className="balance">
        Income ${this.props.summaryIncome} <br />
      </div>
    );
  }
}


export default TotalIncome;