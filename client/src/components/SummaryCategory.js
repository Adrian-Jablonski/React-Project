import React, { Component } from 'react';

// import SummaryCategoryRow from './SummaryCategoryRow';
// import axios from 'axios';

class SummaryCategory extends Component {
    render() {
        let summaryRow = this.props.summaryExpCategories.map(data =>{
            // console.log(data);
            return (
                <tr className="expTableRows">
                    <td>{data.category}</td>
                    <td key={data.category} className="spentAmount">$ {parseFloat(data.total).toFixed(2)}</td>
                </tr>
            ) 
        })
        
        return (
            <tbody className="expenseTable">
                <tr>
                    <th>Category</th>
                    <th className="spentAmount">Spent</th>
                </tr>
                {summaryRow}
            </tbody>
        )
    }
}

export default SummaryCategory