import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import { Grid, Row, Col } from 'react-bootstrap';

class TotalIncome extends Component {

  render() {
    let income = (Number(this.props.incomeTotal)).toFixed(2);
    let expense = (Number(this.props.expTotal)).toFixed(2);
    let balance = (Number(income) - Number(expense)).toFixed(2);

    let formattedIncome = income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formattedExpense = expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formattedBalance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var chartData = {
      labels: ["Income", "Expense"],
      datasets: [
          {
              label: '',
              data: [income, expense],
              backgroundColor:[
                  'rgba(40, 260, 23, 0.6)',
                  'rgba(255, 0, 0, 0.6)'
              ]
          }
      ],
      options: {
        maintainAspectRatio: false
      }
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={5}>
              <tbody className="balance">
                <tr>
                  <td className="income">Income </td>
                  <td className="colspacing income">$ </td>
                  <td className="income numbTotal">{formattedIncome}</td>
                </tr>
                <tr className = "expenseRow">
                  <td className="expense">Expense </td>
                  <td className="colspacing expense">$ </td>
                  <td className="expense numbTotal">{formattedExpense}</td>
                </tr>
                <tr>
                  <td className="balance">Balance </td>
                  <td className="colspacing balance">$ </td>
                  <td className="balance numbTotal">{formattedBalance}</td>
                </tr>
              </tbody>
            </Col>
            <Col xs={7}>
              <div className="summaryChart">
              <Bar
                  data={chartData}
                  // width= {200}
                  // height={100}
                  options={{
                      title: {
                          display: false
                      },
                      legend: {
                          display: false
                      },
                      scales: {
                          xAxes: [{
                              barPercentage: 0.7
                          }],
                          yAxes: [{
                            ticks: {
                              beginAtZero: true
                            }
                          }]
                      }
                  }}
                />
              </div>
            </Col>
      </Row>
    </Grid>
  </div>
    );
  }
}


export default TotalIncome;