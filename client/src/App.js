import React, { Component } from 'react';
import Users from './components/Users.js';

class App extends Component {

  state = {users : []}
  getUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}));
  }

  componentWillMount() {
    this.getUsers();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default App;
