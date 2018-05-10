import React, { Component } from 'react';
import UserItem from './UserItem';
// import axios from 'axios';

class Users extends Component {
    render() {
        var person = this.props.users.map(user =>{
            // console.log(user);
            return (
                <UserItem user = {user} />
                
            )
        })
        // var total = this.props.totals;
        // return (
        //     <UserItem total = {total} />
        // )

        return (
            <div>
                {person}
            </div>
        )
    }
}

export default Users