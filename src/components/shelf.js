import React, { Component } from 'react';
import BookComponent from './book';
import PropTypes from 'prop-types';

class ShelfComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveToShelf: PropTypes.func.isRequired
  }

  render() {
    let { title, books, moveToShelf } = this.props;

    return (
      <div>
        <h3 className="shelf-title">{title}</h3>

        <div className="shelf-books">
          {books.map(book => (
            <BookComponent className="book" key={book.id} book={book} moveToShelf={moveToShelf} />
          ))}
        </div>
      </div>
    )
  }
}

export default ShelfComponent;