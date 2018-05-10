import React, { Component } from 'react';
import axios from 'axios';
import './styles/styles.css';
import { Grid, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';

class EditIncome extends Component {
  state = {newIncome:[], category: []};

  handleSubmit(e) {
    // Runs on add income button click
    e.preventDefault();
    if (this.refs.amount.value === '') {
      alert('Amount is required');
    } else {

      this.setState(
        {newIncome:{
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
          this.props.addIncome(this.state.newIncome['amount']),
          this.props.tableUpdate(true)
        )

      })      
    }
    // e.target.reset();
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
              <option key="paycheck" value="Paycheck">Paycheck</option>
              <option key="investment" value="Investment">Investment</option>
              <option key="bonus" value="Bonus">Bonus</option>
              <option key="other" value="Other">Other</option>
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