import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookshelfChanger from "./BookshelfChanger"

class BookCard extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
  }

  onBookshelfChange(newBookshelf) {
    this.props.onBookshelfChange(this.props.book, newBookshelf);
  }

  render() {
    const { book } = this.props;
    let thumbnail = book.imageLinks && book.imageLinks.thumbnail;
    let currentShelf = book.shelf || "none";
    let authors = book.authors && book.authors.join(", ");

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail || ""})` }}></div>
          <BookshelfChanger currentShelf={currentShelf} onBookshelfChange={(newBookshelf) => this.onBookshelfChange(newBookshelf) } />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default BookCard;