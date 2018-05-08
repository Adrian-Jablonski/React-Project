import React, { Component } from 'react';

class SummaryCategoryRow extends Component {

  render() {
    return (
        <tr>
          <td>{this.props.category.category}</td>
          <td>$ {parseFloat(this.props.category.total).toFixed(2)}</td>
        </tr>
    );
  }
}


export default SummaryCategoryRow;