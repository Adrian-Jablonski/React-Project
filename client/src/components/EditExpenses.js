import React, { Component } from 'react';
import axios from 'axios';
import './styles/styles.css';
import { Grid, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';

class EditExpenses extends Component {
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
        axios.post("/addExpense", {
            category: this.refs.category.value,
            subcategory: this.refs.subcategory.value,
            amount: this.refs.amount.value,
            type: this.refs.type.value,
            expdate: this.refs.expdate.value
            // Receives user input from form
        })
        .then(response => {
          console.log("Then Test")
          this.props.tableUpdate();
        })
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
      this.props.tableUpdate();

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
              <td><input type="text" ref="amount" name="amount" /></td>
            </tr>
            
          </tbody>
            {/* <Grid>
              <Row className ="show-grid">
                <Col xs={3}><label className="expenseLabel">Date: </label></Col>
                <Col xs={9}><InputMask mask="99/99/9999" value="currentDate" ref="expdate" name="expdate" value={currentDate}/></Col>
              </Row>
            </Grid>
          </div>
          <div>
            <Grid>
              <Row className ="show-grid">
                <Col xs={3}><label className="expenseLabel">Category: </label></Col>
                <Col xs={9}><select onChange={this.categoryChange.bind(this)} ref="category" name="category">{expCategory}</select></Col>
              </Row>
            </Grid>
          </div>
          <div>
            <Grid>
                <Row className ="show-grid">
                  <Col xs={3}><label className="expenseLabel">Sub Category </label> </Col>
                  <Col xs={9}><select ref="subcategory" name="subcategory">{expSubcategory}</select> </Col>
                </Row>
              </Grid>
          </div>
          <div>
              <Grid>
                <Row className ="show-grid">
                  <Col xs={3}><label className="expenseLabel">Payment Type: </label> </Col>
                  <Col xs={9}><select ref="type" name="type">
                    <option key="cash" value="Cash">Cash</option>
                    <option key="creditcard" value="Credit Card">Credit Card</option>
                    <option key="check" value="Check">Check</option>
                  </select> </Col>
                </Row>
              </Grid>
          </div>
          <div>
              <Grid>
                <Row className ="show-grid">
                  <Col xs={3}><label className="expenseLabel">Amount $</label> </Col>
                  <Col xs={9}><input type="text" ref="amount" name="amount" /></Col>
                </Row>
              </Grid>
              */}
          </div>
          <input type="submit" value="Add Expense" />
        </form> 
      </div>
      
    );
  }
}

export default EditExpenses;