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
          amount: this.refs.amount.value,
          incdate: this.refs.incdate.value
          // Retrieves user input from form
        } 
      }, 
      function() {
        axios.post("/addIncome", {
            category: this.refs.category.value,
            amount: this.refs.amount.value,
            incdate: this.refs.incdate.value
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
        <tbody>
          <tr>
            <td><label className="expenseLabel">Date </label></td>
            <td className="blankColumn"></td>
            <td><label className="expenseLabel">Category</label></td>
            <td className="blankColumn"></td>
            <td><label className="expenseLabel">Amount</label></td>
          </tr>
          <tr>
            <td><InputMask mask="99/99/9999" value="currentDate" ref="incdate" name="incdate" value={currentDate}/>
            </td>
            <td className="blankColumn"></td>
            <td>
            <select ref="category" name="category">
              <option key="paycheck" value="paycheck">Paycheck</option>
              <option key="investment" value="investment">Investment</option>
              <option key="bonus" value="bonus">Bonus</option>
              <option key="other" value="other">Other</option>
            </select>
            </td>
            <td className="blankColumn"></td>
            <td><input type="text" ref="amount" name="amount" /></td>
          </tr>
          
        </tbody>

        </div>
          <input type="submit" value="Add Income" />
        </form> 
      </div>
      
    );
  }
}

export default EditIncome;