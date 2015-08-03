import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from '../atoms/Search.js';
import * as searchActions from '../../actions/search';

@connect(state => ({
  cards: state.search.cards,
  search: state.search.search
}))
export default class Explore extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onSearch = (search) => {
    this.context.router.transitionTo(`/search/${search}`);
  }

  onSearchChange = (search) => {
    this.props.dispatch(searchActions.searchChange(search));
  }

  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(searchActions, dispatch);

    return (
      <div>
        <Search
          onSearch={ this.onSearch }
          value={ this.props.search }
          onChange={ this.onSearchChange } />
        { this.props.children &&
            React.cloneElement(this.props.children, { actions, ...this.props }) }
      </div>
    );
  }
}