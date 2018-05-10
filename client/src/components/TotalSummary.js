import React, { Component } from 'react';

class TotalIncome extends Component {

  render() {
    return (
      
      <tbody className="balance">
        <tr>
          <td>Income </td>
          <td className="colspacing">$ </td>
          <td>{Number(this.props.incomeTotal)}</td>
        </tr>
        <tr>
          <td>Expense </td>
          <td className="colspacing">$ </td>
          <td>{Number(this.props.expTotal)}</td>
        </tr>
        <tr>
          <td>Balance </td>
          <td className="colspacing">$ </td>
          <td>{(Number(this.props.incomeTotal) - Number(this.props.expTotal)).toFixed(2)}</td>
        </tr>

      </tbody>
    );
  }
}


export default TotalIncome;