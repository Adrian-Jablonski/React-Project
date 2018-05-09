import React, { Component } from 'react';

// import SummaryCategoryRow from './SummaryCategoryRow';
// import axios from 'axios';

class SummaryCategory extends Component {
    render() {
        var i = 0;
        let summaryRow = this.props.summaryExpCategories.map(data =>{
            i += 1;
            var expTableRows = "expTableRow" + i;
            // console.log(data);
            return (
                <tr className={expTableRows}>
                    <td>{i}</td>
                    <td>{data.category}</td>
                    <td key={data.category} className="spentAmount">$ {parseFloat(data.total).toFixed(2)}</td>
                </tr>
            ) 
        })
        
        return (
            <tbody className="expenseTable">
                <tr>
                    <th className="numb">#</th>
                    <th>Category</th>
                    <th className="spentAmount">Spent</th>
                </tr>
                {summaryRow}
            </tbody>
        )
    }
}

export default SummaryCategory