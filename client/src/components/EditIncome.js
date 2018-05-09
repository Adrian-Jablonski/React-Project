import React, { Component } from 'react';
import axios from 'axios';
import './styles/styles.css';
import { Grid, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';

class EditIncome extends Component {
  state = {newExpense:[], category: []};

  handleSubmit(e) {
    e.preventDefault();
    if (this.refs.amount.value === '') {
      alert('Amount is required');
    } else {

      this.setState(
        {newExpense:{
          category: this.refs.category.value,
          subcategory: this.refs.subcategory.value,
          amount: this.refs.amount.value,
          type: this.refs.type.value,
          expdate: this.refs.expdate.value
          // Retrieves user input from form
        } 
      }, 
      function() {
        axios.post("/addIncome", {
            category: this.refs.category.value,
            subcategory: this.refs.subcategory.value,
            amount: this.refs.amount.value,
            type: this.refs.type.value,
            expdate: this.refs.expdate.value
            // Receives user input from form
        })
        .then(
          console.log("Then Test")
        )
        .then(
          console.log("Then Test2")
        )
        .then((response) => {
          // console.log(response);
          console.log("Then Test3")
          this.props.tableUpdate();
        })
        .then(
          console.log("Then Test4")
        )
        .catch(function (error) {
          console.log(error);
        });

        // edits user balance on screen for expenses
      this.props.lessExpense(this.state.newExpense['amount']);
      // this.props.tableUpdate();

      })      
    }
    // e.target.reset();
  }
  categoryChange() {
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

    let expSubcategory = this.props.expSubcategories.map(subcategory => {
      return <option key={subcategory["subcategory"]} value={subcategory["subcategory"]}> {subcategory["subcategory"]} </option>
      
    });

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
        <h1>Add Income</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
        <InputMask mask="99/99/9999" value="currentDate" ref="expdate" name="expdate" value={currentDate}/>
        <select ref="type" name="type">
          <option key="paycheck" value="paycheck">Paycheck</option>
          <option key="investment" value="investment">Investment</option>
          <option key="bonus" value="bonus">Bonus</option>
          <option key="other" value="other">Other</option>
        </select>
        </div>
          <input type="submit" value="Add Income" />
        </form> 
      </div>
      
    );
  }
}

export default EditIncome;