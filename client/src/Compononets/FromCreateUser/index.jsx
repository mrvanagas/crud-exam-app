import React, { Component } from 'react';
import InputGroup from '../InputGroup';

export class FormCreateUser extends Component {
  state = {
    name: '',
    age: '',
    email: '',
    password: '',
    isUpdating: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, email, password, isUpdating } = this.state;
    // VALIDACIJA
    // UsersManager.prototype.saveUser || UsersManager.prototype.createUser
    this.props.handleSubmit({
      name,
      age,
      email: Number(email),
      password: Number(password)
    });
    if (!isUpdating) {
      this.setState({
        name: '',
        age: '',
        email: '',
        password: ''
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isUpdating !== state.isUpdating) {
      return {
        name: props.editedUser?.name ?? '',
        age: props.editedUser?.age ?? '',
        email: props.editedUser?.email ?? '',
        password: props.editedUser?.password ?? '',
        isUpdating: props.isUpdating
      }
    }
    return null;

  }

  render() {
    const { name, age, email, password, isUpdating } = this.state;
    const actionName = (isUpdating ? 'Update' : 'Create') + ' User';

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{actionName}</h3>
        <InputGroup
          name="name"
          value={name}
          handleChange={(name) => this.setState({ name })}
        />
        <InputGroup
          name="age"
          value={age}
          handleChange={(age) => this.setState({ age })}
        />
        <InputGroup
          name="email"
          value={email}
          handleChange={(email) => this.setState({ email })}
        />
        <InputGroup
          name="password"
          value={password}
          handleChange={(password) => this.setState({ password })}
        />
        <button>{actionName}</button>
      </form>
    )
  }
}

export default FormCreateUser