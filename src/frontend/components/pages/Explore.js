import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import assign from 'object-assign';

import ToggleFilter from '../atoms/ToggleFilter';
import Search from '../atoms/Search.js';
import * as searchActions from '../../actions/search';

@connect(state => ({
  cards: state.search.cards,
  search: state.search.search,
  filters: state.search.filters
}))
export default class Explore extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onSearch = (search) => {
    this.context.router.transitionTo(`/search/${search}`, this.props.location.query);
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
        <ToggleFilter
          label='Druid'
          toggled={ !!(this.props.location.query && this.props.location.query['druid']) }
          onToggle={ (toggled) => {
            const ident = 'druid';
            let { query, pathname } = this.props.location;
            query = assign({}, query);
            if (toggled)
              query = assign(query, { [ident]: 1 });
            else
              delete query[ident];
            this.context.router.transitionTo(pathname, query);
          }} />
        { this.props.children &&
            React.cloneElement(this.props.children, { actions, ...this.props }) }
      </div>
    );
  }
}