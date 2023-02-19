import React from 'react';
import { Component } from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>
          <input
            onChange={this.handleChange}
            className={css.input}
            type="text"
            name="q"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
