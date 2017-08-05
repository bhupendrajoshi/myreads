import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

import ShelfComponent from './components/shelf';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books: books }));
  }

  render() {
    return (
      <div>
        <header>MyReads</header>

        <ShelfComponent
          title="Currently reading"
          books={this.state.books.filter(book => book.shelf === 'currentlyReading')} />
        <ShelfComponent
          title="Want to read"
          books={this.state.books.filter(book => book.shelf === 'wantToRead')} />
        <ShelfComponent
          title="Read"
          books={this.state.books.filter(book => book.shelf === 'read')} />
      </div>
    );
  }
}

export default App;
