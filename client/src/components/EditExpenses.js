import React, { Component } from 'react';
import axios from 'axios';
import './styles/styles.css';
import { Grid, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import SummaryCategory from './SummaryCategory';
import Chart2 from './Chart2';

class EditExpenses extends Component {
  state = {newExpense:[], category: []};

  handleChange(e) {
    e.preventDefault();
    this.setState(
      {newExpense:{
        category: this.refs.category.value,
        subcategory: this.refs.subcategory.value,
        amount: this.refs.amount.value,
        type: this.refs.type.value,
        expdate: this.refs.expdate.value
        // Retrieves user input from form
      } 
      
  })
  console.log("On change state: ", this.state)
}

  handleSubmit(e) {
    // runs on add expense button click
    e.preventDefault();
    if (this.refs.amount.value === '') {
      alert('Amount is required');
    } else {
      console.log("Properties")
      console.log(this.props.summaryExpCategories);
        
        // edits user balance on screen for expenses
      this.props.lessExpense(this.state.newExpense['amount']);
      // this.props.tableUpdate();
      this.addExpense();
      // } 
      
    // ) 
         
    }
    // e.target.reset();
    
  }

  addExpense(){

    axios.post("/addExpense", {
      category: this.refs.category.value,
      subcategory: this.refs.subcategory.value,
      amount: this.state.newExpense.amount,
      type: this.refs.type.value,
      expdate: this.refs.expdate.value
      // Receives user input from form
  })
  .then(
    console.log("axios")
  )
    .then(
      // Updates table on add expense button click
      console.log("axios2"),
      this.props.tableUpdate(true)
    )
  }
  categoryChange() {
    // Runs SQL that receives subcategories based on the category selected and populates the dropdown.
    axios.post("/expenseSubcategories/" + this.refs.category.value, {
      category: this.refs.category.value,
      })
      .then(function(response) {
        console.log("category change response");
        console.log(response);
    })
    .then(response => this.props.categoryChange(this.refs.category.value))
  }
    
  render() {
    // Populates Category dropdown field from expensecategories table inside expense_tracker database 
    let expCategory = this.props.expCategories.map(category => {
      return <option key={category["category"]} value={category["category"]}> {category["category"]} </option>
    });

    // Populates subcategory dropdown field based on selection in the category dropdown field
    let expSubcategory = this.props.expSubcategories.map(subcategory => {
      return <option key={subcategory["subcategory"]} value={subcategory["subcategory"]}> {subcategory["subcategory"]} </option>
      
    });

    // Calculates todays date and adds it to the date fields
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month
    }

    let currentDate = month + "/" + day + "/" + year;

    return (
      <div>
        <h1>Add Expenses</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <tbody>
            <tr>
              <td><label className="expenseLabel">Date </label></td>
              <td className="blankColumn"></td>
              <td><label className="expenseLabel">Category /</label></td>
              <td className="blankColumn"></td>
              <td><label className="expenseLabel">Payment Type / </label></td>
            </tr>
            <tr>
              <td></td>
              <td className="blankColumn"></td>
              <td><label className="expenseLabel">Subcategory</label></td>
              <td className="blankColumn"></td>
              <td><label className="expenseLabel">Amount </label></td>
            </tr>
            <tr>
              <td><InputMask mask="99/99/9999" value="currentDate" ref="expdate" name="expdate" value={currentDate}/></td>
              <td className="blankColumn"></td>
              <td><select onChange={this.categoryChange.bind(this)} ref="category" name="category">{expCategory}</select></td>
              <td className="blankColumn"></td>
              <td><select ref="type" name="type">
                    <option key="cash" value="Cash">Cash</option>
                    <option key="creditcard" value="Credit Card">Credit Card</option>
                    <option key="check" value="Check">Check</option>
                  </select></td>
            </tr>
            <tr>
              <td></td>
              <td className="blankColumn"></td>
              <td><select ref="subcategory" name="subcategory">{expSubcategory}</select></td>
              <td className="blankColumn"></td>
              <td><input onChange={this.handleChange.bind(this)} type="text" ref="amount" name="amount" /></td>
            </tr>
            
          </tbody>
          </div>
          <input type="submit" value="Add Expense" />
        </form> 
        <div className="pieChart">
        <Chart2 chartData={this.props.chartData} />
        </div>
      </div>
      
    );
  }
}

export default EditExpenses;