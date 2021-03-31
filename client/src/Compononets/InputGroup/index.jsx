import React, { Component } from 'react';
import styles from './styles.module.css';
export default class InputGroup extends Component {

  render() {
    const { name, value, handleChange } = this.props;
    return (
      <div className={styles.InputGroup}>
        <label htmlFor="name">{name}</label>
        <input
          id={name}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    )
  }
}