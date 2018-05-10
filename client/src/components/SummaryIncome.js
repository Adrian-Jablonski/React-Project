import React, { Component } from 'react';

// import SummaryCategoryRow from './SummaryCategoryRow';
// import axios from 'axios';

class SummaryCategory extends Component {
    render() {
        var i = 0;
        let summaryRow = this.props.summaryIncome.map(data =>{
            i += 1;
            var incTableRows = "expTableRow" + i;
            // console.log(data);
            return (
                <tr className={incTableRows}>
                    <td>{i}</td>
                    <td>{data.category}</td>
                    <td key={data.category} className="incomeAmount">$ {parseFloat(data.total).toFixed(2)}</td>
                </tr>
            ) 
        })
        
        return (
            <tbody className="incomeTable">
                <tr>
                    <th className="numb">#</th>
                    <th>Category</th>
                    <th className="incomeAmount">Income</th>
                </tr>
                {summaryRow}
            </tbody>
        )
    }
}

export default SummaryCategory