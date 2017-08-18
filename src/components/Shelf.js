import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const Shelf = ({ title, books, moveBookToShelf }) => {
  return (
    <div>
      <h3 className="shelf-title">{title}</h3>

      <div className="shelf-books">
        {books.map(book => (
          <Book className="book" key={book.id} book={book} moveBookToShelf={moveBookToShelf} />
        ))}
      </div>
    </div>
  );
};

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default Shelf;