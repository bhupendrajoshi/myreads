import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Shelf from './Shelf';

const Search = ({ books, moveBookToShelf, searchQuery, searchBooks }) => {
  return (
    <div>
      <div className="search-books-bar">
        <div className="close-search">
          <Link to="/">Back</Link>
        </div>

        <div className="search-books-input-wrapper">
          <input type='text'
            placeholder='Search books'
            value={searchQuery}
            onChange={event => searchBooks(event.target.value)} />
        </div>
      </div>

      <div className="search-books-results">
        <Shelf
          title=""
          books={books}
          moveBookToShelf={moveBookToShelf} />
      </div>
    </div>
  );
};

Search.propTypes = {
  books: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchBooks: PropTypes.func.isRequired
};

export default Search;
