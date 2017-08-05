import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookComponent extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    let { book } = this.props;

    return (
      <div>
        <img src={book.imageLinks.thumbnail} alt="" />

        <div>{book.title}</div>

        {book.authors.map(author => (
          <div key={author}>{author}</div>
        ))}
      </div>
    )
  }
}

export default BookComponent;