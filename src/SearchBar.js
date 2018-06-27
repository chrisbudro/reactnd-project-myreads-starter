import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.inputField = null;
  }

  static propTypes = {
    onSearchQueryChange: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.inputField.focus();
  }

  onChange = (event) => {
    this.props.onSearchQueryChange(event.target.value);
  };

  render() {
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input ref={(input) => { this.inputField = input; }} type="text" placeholder="Search by title or author" onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default SearchBar;