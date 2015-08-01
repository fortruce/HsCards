import React from 'react';
import { connect } from 'react-redux';

import Search from '../atoms/Search.js';

@connect(state => ({
  cards: state.cards
}))
export default class CardSearch extends React.Component {
  render() {
    return (
      <div>
        <h1>Search</h1>
        <Search />
      </div>
    );
  }
}