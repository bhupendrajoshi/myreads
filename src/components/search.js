import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';

import * as BooksAPI from '../BooksAPI';
import ShelfComponent from './shelf';

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
      BooksAPI.search(searchTermsToQuery[0]).then(books => this.setState({ books: books }));
    }
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <input type='text'
          placeholder='Search books'
          onChange={event => this.updateQuery(event.target.value)} />

        <ShelfComponent
          title="Currently reading"
          books={this.state.books}
          moveToShelf={this.props.moveToShelf} />
      </div>
    );
  }
}

export default SearchComponent;
