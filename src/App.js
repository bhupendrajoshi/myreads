import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import LibraryComponent from './components/library';
import SearchComponent from './components/search';

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
        previousBooks.forEach(previousBook => {
          if (currentlyReading.find(bid => bid === previousBook.id) !== undefined) {
            previousBook.shelf = 'currentlyReading';
          }
          if (wantToRead.find(bid => bid === previousBook.id) !== undefined) {
            previousBook.shelf = 'wantToRead';
          }
          if (read.find(bid => bid === previousBook.id) !== undefined) {
            previousBook.shelf = 'read';
          }
        });
        return { books: previousBooks };
      })
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div>
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
