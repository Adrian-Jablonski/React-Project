import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import { Grid, Row, Col } from 'react-bootstrap';

// import SummaryCategoryRow from './SummaryCategoryRow';
// import axios from 'axios';

class SummaryCategory extends Component {
    render() {
        var i = 0;
        var labelList = [];
        var dataList = [];
        let summaryRow = this.props.summaryExpCategories.map(data =>{
            labelList[i] = data["category"]
            dataList[i] = parseFloat(data["total"]).toFixed(2);
            i += 1;
            var expTableRows = "expTableRow" + i;
            console.log("map function : ", labelList);
            console.log(dataList);
            return (
                <tr className={expTableRows}>
                    <td>{i}</td>
                    <td>{data.category}</td>
                    <td key={data.category} className="spentAmount">$ {parseFloat(data.total).toFixed(2)}</td>
                </tr>
            ) 
        })
        var chartData = {
            labels: labelList,
            datasets: [
                {
                    label: 'Expense Category',
                    data: dataList,
                    backgroundColor:[
                        'rgba(55, 255, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 0, 0, 0.6)',
                        'rgba(40, 260, 23, 0.6)',
                        'rgba(255, 260, 64, 0.6)',
                        'rgba(15, 15, 15, 0.6)',
                        'rgba(255, 100, 64, 0.6)',
                        'rgba(0, 0, 255, 0.6)',
                    ]
                }
            ]
        }
        
        return (
            <div>
                <Grid>
                    <Row className ="show-grid">
                        <Col xs={4}>
                            <tbody className="expenseTable">
                                <tr>
                                    <th className="numb">#</th>
                                    <th>Category</th>
                                    <th className="spentAmount">Spent</th>
                                </tr>
                                {summaryRow}
                            </tbody>
                        </Col>
                        <Col xs={8}>
                            <div className="chart pieChart">
                                <Pie
                                    data={chartData}
                                    
                                    width= {200}
                                    height={150}
                                    options={{
                                        legend: {
                                            display: false
                                        }
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default SummaryCategory