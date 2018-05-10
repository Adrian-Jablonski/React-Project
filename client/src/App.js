import React, { Component } from 'react';
import Users from './components/Users.js';
import EditExpenses from './components/EditExpenses.js'
import SummaryCategory from './components/SummaryCategory';
import EditIncome from './components/EditIncome.js'
import axios from 'axios';
import Chart from './components/Chart';
import Chart2 from './components/Chart2';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

  state = {users : [], 
        totals : {},
        expCategories: [],
        expSubcategories: [],
        summaryExpCategories: [],
        chartData: {}
    }
  getUsers() {
    // Currently used to show balance at the top of the page
    let users = this.state.users;
    fetch('/users')
      .then(res => res.json())
      .then(user => this.setState({users:user}));
  }
  getTotals() {
    // What I will want to use to show expense and income totals on top of page
    let totals = this.state.totals;
    let expTotal = totals.expTotal
    fetch('/expTotals')
      .then(res => res.json())
      .then(total => this.setState({expTotal:total}));
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
        
        for (var i = 0; i < data.length; i++) {
          labelList[i] = data[i]["category"];
          dataList[i] = parseFloat(data[i]["total"]).toFixed(2);
        }
        // console.log(dataList)
      })
        this.state.chartData = {
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
  } 

  componentWillMount() {
    this.getChartData();
    this.getUsers();
    this.getCategories();
    this.getSubcategories();
    this.getsummaryExpCategories();
    this.tableUpdate();
  }

  componentDidMount() {
    this.getChartData();
    this.getUsers();
    this.getSubcategories();
    this.tableUpdate();
  }

  lessExpense(amount) {
    // Edits the balance for expenses
    let users = this.state.users;
    users[0]["balance"] -= amount;
    this.setState({users:users})
  }

  addIncome(amount) {
    // Edits the balance for income
    amount = Number(amount);
    let users = this.state.users;
    users[0]["balance"] += amount;
    this.setState({users:users})
  }


  categoryChange(categ) {
    // Changes the subcategory options based on the category that is selected
    fetch('/expenseSubcategories/' + categ)
      .then(res => res.json())
      .then(expSubcategories => this.setState({expSubcategories}));
  }
  
  tableUpdate(update) {
    // Updates expense table when the add expense button is clicked
    var priorState = this.state.summaryExpCategories;
    if (update === true) {
      var i = 0;
      while (update === true) {
        fetch('/summaryExpCategory')
        .then(res => res.json())
        .then(summary => this.setState({summaryExpCategories:summary}))
        if (i === 100) {
          update = false;
          this.getChartData();
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
        <Users users={this.state.users} />
        <br />

        <EditIncome addIncome={this.addIncome.bind(this)}/>

        <EditExpenses lessExpense={this.lessExpense.bind(this)} 
        categoryChange={this.categoryChange.bind(this)} 
        tableUpdate={this.tableUpdate.bind(this)}
         expCategories={this.state.expCategories} expSubcategories={this.state.expSubcategories} summaryExpCategories={this.state.summaryExpCategories}/>    
         <Grid>
          <Row className ="show-grid">

          <Col xs={5}><SummaryCategory summaryExpCategories={this.state.summaryExpCategories} />
          </Col>

          <Col xs={7}>
            <div className="pieChart">
            <Chart2 chartData={this.state.chartData} /></div>
          </Col>
          </Row>
         </Grid>

         <Chart chartData={this.state.chartData} />
         
      </div>
    );
  }
}

export default App;
