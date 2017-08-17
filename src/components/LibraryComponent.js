import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ShelfComponent from './ShelfComponent';

const LibraryComponent = ({ books, moveToShelf }) => {
  return (
    <div>
      <header className="title">My Reads</header>

      <ShelfComponent
        title="Currently reading"
        books={books.filter(book => book.shelf === 'currentlyReading')}
        moveToShelf={moveToShelf} />
      <ShelfComponent
        title="Want to read"
        books={books.filter(book => book.shelf === 'wantToRead')}
        moveToShelf={moveToShelf} />
      <ShelfComponent
        title="Read"
        books={books.filter(book => book.shelf === 'read')}
        moveToShelf={moveToShelf} />

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

LibraryComponent.propTypes = {
  books: PropTypes.array.isRequired,
  moveToShelf: PropTypes.func.isRequired
};

export default LibraryComponent;