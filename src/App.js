import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import SearchPage from './SearchPage'
import { Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    categorizedBookIds: {},
    allBooks: {},
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then(books => {
      let categorizedBookIds = {
        currentlyReading: [],
        wantToRead: [],
        read: []
      };

      let allBooks = {};

      for (let book of books) {
        categorizedBookIds[book.shelf].push(book.id);
        allBooks[book.id] = book;
      }

      this.setState({
        categorizedBookIds: categorizedBookIds,
        allBooks: allBooks
      });
    });
  }

  displayNameForBookshelf(bookshelf) {
    switch (bookshelf) {
      case "currentlyReading":
        return "Currently Reading";
      case "wantToRead":
        return "Want to Read";
      case "read":
        return "Read";
      default:
        return null;
    }
  }

  onBookshelfChange = (book, newBookshelf) => {
    BooksAPI.update(book, newBookshelf).then(newCategorizedIds => {
      BooksAPI.get(book.id).then(book => {
        this.setState(currentState => {
          let allBooks = currentState.allBooks;
          allBooks[book.id] = book;

          return {
            categorizedBookIds: newCategorizedIds,
            allBooks: allBooks
          };
        });
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { Object.keys(this.state.categorizedBookIds).map(bookshelfKey => {
                  let bookshelfTitle = this.displayNameForBookshelf(bookshelfKey);
                  let bookIds = this.state.categorizedBookIds[bookshelfKey];
                  let books = bookIds.map(bookId => this.state.allBooks[bookId]);
                  return <Bookshelf key={bookshelfKey} title={bookshelfTitle} books={books} onBookshelfChange={this.onBookshelfChange} />
                } )
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <SearchPage bookshelfBooks={this.state.allBooks} onBookshelfChange={this.onBookshelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp