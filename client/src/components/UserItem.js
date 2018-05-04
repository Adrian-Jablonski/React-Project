import React, { Component } from 'react';
import axios from 'axios';

class UserItem extends Component {

  render() {
    return (
      <div>
        Name: {this.props.user.username} <br /> 
        Money: {this.props.user.balance} <br />

      </div>
    );
  }
}


export default UserItem;