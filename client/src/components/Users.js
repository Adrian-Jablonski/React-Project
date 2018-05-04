import React, { Component } from 'react';
import UserItem from './UserItem';
// import axios from 'axios';

class Users extends Component {
    render() {
        // var personList = [];
        // var i = 0;
        var person = this.props.users.map(user =>{
            // personList[i] = user;
            // i += 1
            console.log(user);
            return (
                <UserItem user = {user} />
            )
            
        })

        return (
            <div>
                {person}
            </div>
        )
    }
}

export default Users