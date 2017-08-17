import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';

import * as BooksAPI from '../BooksAPI';
import ShelfComponent from './ShelfComponent';

class SearchComponent extends Component {

  searchTerms = [
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
    'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
    'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling',
    'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas',
    'Education', 'Everything',
    'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future',
    'Games', 'Gandhi',
    'History', 'History', 'Homer', 'Horror', 'Hugo',
    'Ibsen',
    'Journey',
    'Kafka', 'King',
    'Lahiri', 'Larsson', 'Learn', 'Literary Fiction',
    'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
    'Negotiate',
    'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming',
    'React', 'Redux', 'River', 'Robotics', 'Rowling',
    'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
    'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel',
    'Ultimate',
    'Virtual Reality',
    'Web Development',
    'iOS'
  ];

  static propTypes = {
    booksAlreadyOnShelf: PropTypes.array.isRequired,
    moveToShelf: PropTypes.func.isRequired
  }

  state = {
    books: []
  }

  updateQuery = (query) => {
    let searchTermsToQuery = [];
    if (query) {
      const match = new RegExp(`^${escapeRegExp(query)}`, 'i');
      searchTermsToQuery = this.searchTerms.filter(st => match.test(st));
    } else {
      searchTermsToQuery = [];
    }

    if (searchTermsToQuery && searchTermsToQuery.length > 0) {
      searchTermsToQuery.sort();
      BooksAPI.search(searchTermsToQuery[0]).then(books => {
        books.forEach(book => {
          var bookAlreadyOnShelf = this.props.booksAlreadyOnShelf.find(b => b.id === book.id);
          if (bookAlreadyOnShelf !== undefined) {
            book.shelf = bookAlreadyOnShelf.shelf;
          }
          else {
            book.shelf = "none";
          }
        })

        this.setState({ books: books });
      });
    }
    else {
      this.setState({ books: [] });
    }
  }

  render() {
    return (
      <div>
        <div className="search-books-bar">
          <div className="close-search">
            <Link to="/">Back</Link>
          </div>

          <div className="search-books-input-wrapper">
            <input type='text'
              placeholder='Search books'
              onChange={event => this.updateQuery(event.target.value)} />
          </div>
        </div>

        <div className="search-books-results">
          <ShelfComponent
            title=""
            books={this.state.books}
            moveToShelf={this.props.moveToShelf} />
        </div>
      </div>
    );
  }
}

export default SearchComponent;
