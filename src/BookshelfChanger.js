import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {

  static propTypes = {
    currentShelf: PropTypes.string.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
  }

  onChange = (event) => {
    this.props.onBookshelfChange(event.target.value);
  };

  shouldComponentUpdate(newProps, newState) {
    return newProps.currentShelf !== this.props.currentShelf;
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.currentShelf} onChange={this.onChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;