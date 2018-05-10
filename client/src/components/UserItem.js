import React, { Component } from 'react';

class UserItem extends Component {

  render() {
    return (
      <div className="balance">
        Balance ${this.props.user.balance} <br />
        {/* Expense $ {this.props.total.expTotal} */}
      </div>
    );
  }
}


export default UserItem;