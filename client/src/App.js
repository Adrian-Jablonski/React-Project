import React, { Component } from 'react';
import Users from './components/Users.js';
import EditExpenses from './components/EditExpenses.js'
import axios from 'axios';

class App extends Component {

  state = {users : [], 
        expCategories: [],
        expSubcategories: []
    }
  getUsers() {
    let users = this.state.users;
    fetch('/users')
      .then(res => res.json())
      .then(user => this.setState({users:user}));
  }
  getCategories() {
    fetch('/expenseCategories')
      .then(res => res.json())
      .then(expCategories => this.setState({expCategories}));
  }

  getSubcategories() {
    fetch('/expenseSubcategories/Auto')
      .then(res => res.json())
      .then(expSubcategories => this.setState({expSubcategories}));
  }

  componentWillMount() {
    this.getUsers();
    this.getCategories();
    this.getSubcategories();
  }

  componentDidMount() {
    this.getUsers();
    this.getSubcategories();
  }

  lessExpense(amount) {
    // Edits the balance for expenses
    let users = this.state.users;
    users[0]["balance"] -= amount;
    this.setState({users:users})
  }
  categoryChange(categ) {
    // Changes the subcategory options based on the category that is selected
    console.log("categoryChange:",categ)
    fetch('/expenseSubcategories/' + categ)
      .then(res => res.json())
      .then(expSubcategories => this.setState({expSubcategories}));
  }
    
  render() {
    return (
      <div>
        {/* <Users users={this.state.users} /> */}
        <Users users={this.state.users} />
        <br />
        <EditExpenses lessExpense={this.lessExpense.bind(this)} 
        categoryChange={this.categoryChange.bind(this)}
         expCategories={this.state.expCategories} expSubcategories={this.state.expSubcategories} />
      </div>
    );
  }
}

export default App;
