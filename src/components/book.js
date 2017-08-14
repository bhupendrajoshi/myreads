import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookComponent extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveToShelf: PropTypes.func.isRequired
  }

  render() {
    let { book, moveToShelf } = this.props;

    return (
      <div className="book-container">
        <img className="book-cover" src={book.imageLinks != null ? book.imageLinks.thumbnail : undefined} alt="" />

        <div className="book-shelf">
          <select value={book.shelf} onChange={e => moveToShelf(book, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>

        <div className="book-title">{book.title}</div>

        <div className="book-authors">
          {book.authors && book.authors.map(author => (
            <div key={author}>{author}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default BookComponent;