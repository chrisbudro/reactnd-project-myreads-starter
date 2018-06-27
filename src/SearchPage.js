import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from "./SearchBar"
import * as BooksAPI from './BooksAPI'
import BookCard from './BookCard'

class SearchPage extends Component {
  static propTypes = {
    bookshelfBooks: PropTypes.object.isRequired
  };

  state = {
    searchResults: []
  };

  onSearchQueryChange = (query) => {
    if (query.length < 1) {
      this.setState({
        searchResults: []
      });
      return;
    }

    BooksAPI.search(query).then(results => {
      if (results.error) {
        results = [];
      }

      this.setState({
        searchResults: results
      });
    });
  };

  isOnBookshelf(book) {
    let allBookIds = Object.keys(this.props.bookshelfBooks);
    return allBookIds.includes(book.id);
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar onSearchQueryChange={this.onSearchQueryChange} />
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.searchResults.map(bookResult => {
                let book = bookResult;
                if (this.isOnBookshelf(bookResult)) {
                  book = this.props.bookshelfBooks[bookResult.id];
                }
                return <li><BookCard book={book} onBookshelfChange={this.props.onBookshelfChange}/></li>
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;