import React, { Component } from 'react';

import API from '../../api';
import UserTable from '../UserTable';
import FormCreateUser from '../FromCreateUser';
import styles from './styles.module.css';

export default class UsersManager extends Component {
  state = {
    users: [],
    editedUserId: null,
    errMsg: null,
  }

  //fetch user
  fetchUsers = () => {
    API.getUsers(({ users }) => this.setState({ users }), this.displayError)
  }

  //create and post
  createUser = (data) => {
    API.postUser(data, this.fetchUsers, this.displayError);
  }

  editUser = (id) => {
    this.setState({ editedUserId: id === this.state.editedUserId ? null : id });
  }

 //update
  saveUser = (data) => {
    API.updateUser(this.state.editedUserId, data, this.fetchUsers, this.displayError);
    this.setState({ editedUserId: null });
  }

 //delete
  deleteUser = (id) => {
    API.deleteUser(id, this.fetchUsers, this.displayError)
  }

  displayError = errMsg => {
    console.log(errMsg);
    this.setState({ errMsg });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <div className={styles.Grid}>
        <UserTable
          users={this.state.users}
          deleteUser={this.deleteUser}
          editUser={this.editUser}
        />
        <FormCreateUser
          handleSubmit={this.state.editedUserId ? this.saveUser : this.createUser}
          isUpdating={Boolean(this.state.editedUserId)}
          editedUser={this.state.editedUserId ? this.state.users.find(c => c.id === this.state.editedUserId)  : null}
        />
      </div>
    )
  }
};