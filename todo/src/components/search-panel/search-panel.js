import React, { Component } from 'react';

import './search-panel.sass';

export default class SearchPanel extends Component {
  state = {
    term: ''
  };

  onSearchChange = (e)=> {
    const term = e.target.value;
    this.setState({term});
    this.props.onSearched(term);
  };

  render() {
    return (
      <input type="text"
              className="form-control search-input"
              placeholder='Type here to search' 
              onChange={ this.onSearchChange } 
              value={ this.state.term }/>
    );
  }
};