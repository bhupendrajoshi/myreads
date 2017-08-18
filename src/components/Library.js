import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Shelf from './Shelf';

const Library = ({ books, moveBookToShelf }) => {
  return (
    <div className="app">
      <header className="title">My Reads</header>

      <Shelf
        title="Currently reading"
        books={books.filter(book => book.shelf === 'currentlyReading')}
        moveBookToShelf={moveBookToShelf} />
      <Shelf
        title="Want to read"
        books={books.filter(book => book.shelf === 'wantToRead')}
        moveBookToShelf={moveBookToShelf} />
      <Shelf
        title="Read"
        books={books.filter(book => book.shelf === 'read')}
        moveBookToShelf={moveBookToShelf} />

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

Library.propTypes = {
  books: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default Library;