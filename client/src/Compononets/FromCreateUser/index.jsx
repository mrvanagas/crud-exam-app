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
    this.props.handleSubmit({
      name,
      age,
      email,
      password
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
    const actionName = `${isUpdating ? 'Create' : 'Update'}  User`;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{actionName}</h3>
        <InputGroup
          name="Vardas"
          value={name}
          handleChange={(name) => this.setState({ name })}
        />
        <InputGroup
          name="Amzius"
          value={age}
          handleChange={(age) => this.setState({ age })}
        />
        <InputGroup
          name="E. Pastas"
          value={email}
          handleChange={(email) => this.setState({ email })}
        />
        <InputGroup
          name="Slaptazodis"
          value={password}
          handleChange={(password) => this.setState({ password })}
        />
        <button>{actionName}</button>
      </form>
    )
  }
}

export default FormCreateUser