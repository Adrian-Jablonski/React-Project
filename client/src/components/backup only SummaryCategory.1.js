import React, { Component } from 'react';
import SummaryCategoryRow from './SummaryCategoryRow';
// import axios from 'axios';

class SummaryCategory extends Component {
    render() {
        var summaryRow = this.props.summaryExpCategories.map(category =>{
            console.log(category);
            return (
                <SummaryCategoryRow category = {category} />
            ) 
        })
        return (
            <span>
                {summaryRow}
            </span>
        )
    }
}

export default SummaryCategory