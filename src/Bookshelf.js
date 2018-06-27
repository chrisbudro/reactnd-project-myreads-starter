import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.map(book => <li key={book.id}><BookCard book={book} onBookshelfChange={this.props.onBookshelfChange}/></li>) }
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;