import React, { Component } from 'react';
import Users from './components/Users.js';
import EditExpenses from './components/EditExpenses.js'

class App extends Component {

  state = {users : [], 
        expCategories: [],
        expSubcategories: []
    }
  getUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}));
  }
  getCategories() {
    fetch('/expenseCategories')
      .then(res => res.json())
      .then(expCategories => this.setState({expCategories}));
  }

  getSubcategories() {
    fetch('/expenseSubcategories')
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
  }

  // componentDidUpdate() {
  //   this.getSubcategories();
  // }

  render() {
    return (
      <div>
        <Users users={this.state.users} />
        <br />
        <EditExpenses expCategories={this.state.expCategories} expSubcategories={this.state.expSubcategories} />
      </div>
    );
  }
}

export default App;
