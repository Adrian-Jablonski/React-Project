import React, { Component } from 'react';

class UserItem extends Component {

  render() {
    return (
      <div className="balance">
        Balance ${this.props.user.balance} <br />

      </div>
    );
  }
}


export default UserItem;