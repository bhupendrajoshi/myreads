import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import LibraryComponent from './components/LibraryComponent';
import SearchComponent from './components/SearchComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books: books }));
  }

  moveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res =>
      this.setState((previousState) => {
        let { currentlyReading, wantToRead, read } = res;
        let previousBooks = previousState.books;

        if (previousBooks.find(prevBook => prevBook.id === book.id) === undefined) {
          previousBooks.push(book);
        }

        previousBooks.forEach(previousBook => {
          if (currentlyReading.find(bid => bid === previousBook.id) !== undefined) {
            previousBook.shelf = 'currentlyReading';
          }
          else if (wantToRead.find(bid => bid === previousBook.id) !== undefined) {
            previousBook.shelf = 'wantToRead';
          }
          else if (read.find(bid => bid === previousBook.id) !== undefined) {
            previousBook.shelf = 'read';
          }
          else {
            previousBook.shelf = 'none';
          }
        });
        return { books: previousBooks };
      })
    );
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (
          <LibraryComponent
            books={this.state.books}
            moveToShelf={(book, shelf) => this.moveToShelf(book, shelf)} />
        )} />
        <Route exact path="/search" render={() => (
          <SearchComponent
            booksAlreadyOnShelf={this.state.books}
            moveToShelf={(book, shelf) => this.moveToShelf(book, shelf)} />
        )} />
        <Route component={PageNotFoundComponent} />
      </Switch>
    );
  }
}

export default App;
