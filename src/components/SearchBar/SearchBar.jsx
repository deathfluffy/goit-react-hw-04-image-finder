import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../../icon/search.svg';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();

    if (query.toLowerCase() === trimmedQuery.toLowerCase()) {
      toast.info(`You're already viewing images for ${query}!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setQuery(trimmedQuery);
    setInputValue('');

    onSubmit(trimmedQuery);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit} autoComplete="off">
        <button type="submit" className={css.SearchFormButton}>
          <SearchIcon />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
