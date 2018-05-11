import React, { Component } from 'react';
import Users from './components/Users.js';
import EditExpenses from './components/EditExpenses.js'
import SummaryCategory from './components/SummaryCategory';
import SummaryIncome from './components/SummaryIncome';
import EditIncome from './components/EditIncome.js'
import TotalSummary from './components/TotalSummary.js'
import axios from 'axios';
import Chart from './components/Chart';
import Chart2 from './components/Chart2';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

  constructor() {
    super();
    this.state = {
      users : [], 
      expTotal : [],
      incomeTotal : [],
      expCategories: [],
      expSubcategories: [],
      summaryExpCategories: [],
      summaryIncome: [],
      chartData: {},
    }
  }
  // state = {users : [], 
  //       expTotal : [],
  //       incomeTotal : [],
  //       expCategories: [],
  //       expSubcategories: [],
  //       summaryExpCategories: [],
  //       summaryIncome: [],
  //       chartData: {},
  //   }
  getUsers() {
    // Currently used to show balance at the top of the page
    let users = this.state.users;
    fetch('/users')
      .then(res => res.json())
      .then(user => this.setState({users:user}));
  }
  getTotals() {
    // What I will want to use to show expense and income totals on top of page
    // let expTotal = this.state.expTotal;
    fetch('/expTotal')
      .then(res => res.json())
      .then(expTotal => this.setState({expTotal}))

    fetch('/incomeTotal')
      .then(res => res.json())
      .then(incomeTotal => this.setState({incomeTotal}))

    console.log("Exp total state: ", this.state)
  }
  getCategories() {
    // Fills the category dropdown with the categories in the database
    fetch('/expenseCategories')
      .then(res => res.json())
      .then(expCategories => this.setState({expCategories}));
  }

  getSubcategories() {
    // Defaults the sub category dropdown to Auto for page load
    fetch('/expenseSubcategories/Auto')
      .then(res => res.json())
      .then(expSubcategories => this.setState({expSubcategories}));
  }

  getsummaryExpCategories() {
    // Used to get new summary data by category
    let summaryExpCategories = this.state.summaryExpCategories;
    fetch('/summaryExpCategory')
      .then(res => res.json())
      .then(summary => this.setState({summaryExpCategories:summary}));
  }

  getsummaryIncome() {
    // Used to get new summary data by category
    let summaryIncome = this.state.summaryIncome;
    fetch('/summaryIncome')
      .then(res => res.json())
      .then(summary => this.setState({summaryIncome:summary}));
    console.log("Total Income state",this.state);
  }

  getChartData() {
    // Generates graphs of the data. Currently does not update the chart on any button clicks
    var labelList = [];
    var dataList = [];
    // Used to pass the current data to the graphs
    fetch('/summaryExpCategory')
      .then(res => res.json())
      .then(summary => {
        var data = summary;
        console.log("CHART DATA");
        console.log(data);
        console.log("chart state: ", this.state);
        
        for (var i = 0; i < data.length; i++) {
          labelList[i] = data[i]["category"];
          dataList[i] = parseFloat(data[i]["total"]).toFixed(2);
        }
          console.log("dataList: ", dataList)
      })

        // this.state.chartData = {
        var chartData3 = {
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
        this.setState({chartData: chartData3})


  } 

  componentWillMount() {
    this.getChartData();
    this.getUsers();
    this.getCategories();
    this.getSubcategories();
    this.getsummaryExpCategories();
    this.getsummaryIncome();
    this.tableUpdate();
    this.getTotals();
  }

  componentDidMount() {
    this.getChartData();
    this.getUsers();
    this.getSubcategories();
    this.getsummaryIncome();
    this.tableUpdate();
    this.getTotals();
  }

  lessExpense(amount) {
    // Edits the balance for expenses
    let expense = Number(this.state.expTotal);
    expense += Number(amount);
    expense = expense.toFixed(2)
    this.setState({expTotal:expense})
  }

  addIncome(amount) {
    // Edits the balance for income
    let income = Number(this.state.incomeTotal);
    income += Number(amount);
    income = income.toFixed(2)
    this.setState({incomeTotal:income})
  }


  categoryChange(categ) {
    // Changes the subcategory options based on the category that is selected
    fetch('/expenseSubcategories/' + categ)
      .then(res => res.json())
      .then(expSubcategories => this.setState({expSubcategories}));
  }
  
  tableUpdate(update) {
    // Updates expense table when the add expense button is clicked
    if (update === true) {    
      var i = 0;
      while (update === true) {
        fetch('/summaryExpCategory')
        .then(res => res.json())
        .then(summary => this.setState({summaryExpCategories:summary}))
        let summaryIncome = this.state.summaryIncome;
        fetch('/summaryIncome')
          .then(res => res.json())
          .then(summary => this.setState({summaryIncome:summary}));
        if (i === 60) {
          update = false;
          // this.getChartData();
          // Should update the chart after clicking add expense button but does not work
        }
        else {
          i += 1
        }
        //console.log(this.state.summaryExpCategories)
        //console.log(priorState === this.state.summaryExpCategories)
      }
    }
  }

    
  render() {
    return (
      <div className="content">
        {/* <Users users={this.state.users} /> */}
        <div className="financialSummary">
          <h1 className="summaryHeading">Financial Summary</h1>
          <TotalSummary expTotal={this.state.expTotal} incomeTotal={this.state.incomeTotal}/>
          <br />
        </div>

        <EditIncome addIncome={this.addIncome.bind(this)} tableUpdate={this.tableUpdate.bind(this)}/>
        <SummaryIncome summaryIncome={this.state.summaryIncome} />

        <EditExpenses lessExpense={this.lessExpense.bind(this)} 
        categoryChange={this.categoryChange.bind(this)} 
        tableUpdate={this.tableUpdate.bind(this)}
         expCategories={this.state.expCategories} expSubcategories={this.state.expSubcategories} summaryExpCategories={this.state.summaryExpCategories}
         chartData={this.state.chartData}/>    
         <Grid>
          <Row className ="show-grid">

          <Col xs={5}><SummaryCategory summaryExpCategories={this.state.summaryExpCategories} />
          </Col>

          <Col xs={7}>
            {/* <div className="pieChart">
            <Chart2 chartData={this.state.chartData} /></div> */}
          </Col>
          </Row>
         </Grid>

         <Chart chartData={this.state.chartData} />
         
      </div>
    );
  }
}

export default App;
