import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';

import * as BooksAPI from './BooksAPI';
import Library from './components/Library';
import Search from './components/Search';
import PageNotFound from './components/PageNotFound';

class App extends Component {

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

  state = {
    books: [],
    searchQuery: '',
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books: books, searchedBooks: [] }));
  }

  moveBookToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res =>
      this.setState((previousState) => {
        let { currentlyReading, wantToRead, read } = res;
        let previousBooks = previousState.books;
        let previousSearchedBooks = previousState.searchedBooks;

        if (previousBooks.find(prevBook => prevBook.id === book.id) === undefined) {
          previousBooks.push(book);
        }

        previousBooks.forEach(book => {
          if (currentlyReading.find(bid => bid === book.id) !== undefined) {
            book.shelf = 'currentlyReading';
          }
          else if (wantToRead.find(bid => bid === book.id) !== undefined) {
            book.shelf = 'wantToRead';
          }
          else if (read.find(bid => bid === book.id) !== undefined) {
            book.shelf = 'read';
          }
          else {
            book.shelf = 'none';
          }
        });

        previousSearchedBooks.forEach(book => {
          if (currentlyReading.find(bid => bid === book.id) !== undefined) {
            book.shelf = 'currentlyReading';
          }
          else if (wantToRead.find(bid => bid === book.id) !== undefined) {
            book.shelf = 'wantToRead';
          }
          else if (read.find(bid => bid === book.id) !== undefined) {
            book.shelf = 'read';
          }
          else {
            book.shelf = 'none';
          }
        });

        return { books: previousBooks, searchedBooks: previousSearchedBooks };
      })
    );
  }

  searchBooks = (query) => {
    let searchTermsToQuery = [];
    if (query) {
      const match = new RegExp(`^${escapeRegExp(query)}`, 'i');
      searchTermsToQuery = this.searchTerms.filter(st => match.test(st));
    } else {
      searchTermsToQuery = [];
    }

    this.setState({ searchQuery: query });

    if (searchTermsToQuery && searchTermsToQuery.length > 0) {
      searchTermsToQuery.sort();
      BooksAPI.search(searchTermsToQuery[0]).then(searchedBooks => {
        this.setState((previousState => {
          searchedBooks.forEach(searchedBook => {
            var bookAlreadyOnShelf = previousState.books.find(b => b.id === searchedBook.id);
            if (bookAlreadyOnShelf !== undefined) {
              searchedBook.shelf = bookAlreadyOnShelf.shelf;
            }
            else {
              searchedBook.shelf = "none";
            }
          })

          if (previousState.searchQuery.length > 0) {
            this.setState({ searchedBooks: searchedBooks });
          }
          else {
            this.setState({ searchedBooks: [] });
          }
        }))
      });
    }
    else {
      this.setState({ searchedBooks: [] });
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (
          <Library
            books={this.state.books}
            moveBookToShelf={(book, shelf) => this.moveBookToShelf(book, shelf)} />
        )} />
        <Route exact path="/search" render={() => (
          <Search
            books={this.state.searchedBooks}
            moveBookToShelf={(book, shelf) => this.moveBookToShelf(book, shelf)}
            searchQuery={this.state.searchQuery}
            searchBooks={(query) => this.searchBooks(query)} />
        )} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default App;
