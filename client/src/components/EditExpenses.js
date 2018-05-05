import React, { Component } from 'react';
import axios from 'axios';

class EditExpenses extends Component {
  state = {newExpense:[]};

  handleSubmit(e) {
    e.preventDefault();
    if (this.refs.category.value === '') {
      alert('Category is required');
    } else {

      this.setState(
        {newExpense:{
          category: this.refs.category.value,
          subcategory: this.refs.subcategory.value,
          amount: this.refs.amount.value,
          type: this.refs.type.value
          // Retrieves user input from form
        } 
      }, 
      function() {
        axios.post("/addExpense", {
            category: this.refs.category.value,
            subcategory: this.refs.subcategory.value,
            amount: this.refs.amount.value,
            type: this.refs.type.value
            // Retrieves user input from form
        })
        .then(function(response) {
          console.log(response)
        })
      })
      
    }
    // e.target.reset();
  }

  categoryChange() {
    console.log("Testing")
    axios.post("/expenseSubcategories", {
      category: this.refs.category.value,
  })
  .then(function(response) {
    console.log(response)
  })
  }
  

  render() {
    // Populates Category dropdown field from expensecategories table inside expense_tracker database 
    let expCategory = this.props.expCategories.map(category => {
      return <option key={category["category"]} value={category["category"]}> {category["category"]} </option>
    });

    let expSubcategory = this.props.expSubcategories.map(subcategory => {
      return <option key={subcategory["subcategory"]} value={subcategory["subcategory"]}> {subcategory["subcategory"]} </option>
    });

    return (
      <div>
        <h1>Add Expenses</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Category: </label>
            <select onChange={this.categoryChange.bind(this)} ref="category" name="category">{expCategory}</select>

          </div>
          <div>
            <label>Sub Category </label>
            {/* <input type="text" ref="subcategory" name="subcategory" /> */}
            <select ref="subcategory" name="subcategory">{expSubcategory}</select>
          </div>
          <div>
            <label>Amount</label>
            <input type="text" ref="amount" name="amount" />
          </div>
          <div>
            <label>Payment Type: </label>
            <input type="text" ref="type" name="type" />
          </div>
          <input type="submit" value="Add Expense" />
        </form>
      </div>
      
    );
  }
}

export default EditExpenses;