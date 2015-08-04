import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardSearch from '../elements/CardSearch';
import * as searchActions from '../../actions/search';

@connect(state => ({
  cards: state.search.cards,
  search: state.search.search,
  filters: state.search.filters
}))
export default class Explore extends React.Component {
  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(searchActions, dispatch);

    return (
      <div>
        <CardSearch { ...this.props } />
        { this.props.children &&
            React.cloneElement(this.props.children, { actions, ...this.props }) }
      </div>
    );
  }
}