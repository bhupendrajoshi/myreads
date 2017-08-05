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
        <h3>{title}</h3>

        {books.map(book => (
          <BookComponent key={book.id} book={book} moveToShelf={moveToShelf} />
        ))}
      </div>
    )
  }
}

export default ShelfComponent;