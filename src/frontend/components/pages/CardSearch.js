import React from 'react';
import { connect } from 'react-redux';

import Search from '../atoms/Search.js';
import { searchCards } from '../../actions/cards';

@connect(state => ({
  cards: state.cards.cards
}))
export default class CardSearch extends React.Component {
  onSearch = (search) => {
    this.props.dispatch(searchCards(search));
  }

  render() {
    return (
      <div>
        <h1>Search</h1>
        <Search
          onSearch={ this.onSearch } />
        <ul>
          { this.props.cards.map(c => <li>{ c.name }</li>) }
        </ul>
      </div>
    );
  }
}