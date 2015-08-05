import React, { PropTypes } from 'react';
import assign from 'object-assign';

import Search from '../atoms/Search';
import ClassToggles from './ClassToggles';
import { searchChange } from '../../actions/search';

// colors from http://wowwiki.wikia.com/Class_colors
const COLORS = {
  druid: '#ff7d0a',
  hunter: '#abd473',
  mage: '#69ccf0',
  paladin: '#f58cba',
  priest: '#ffffff',
  rogue: '#fff569',
  shaman: '#0070de',
  warlock: '#9482c9',
  warrior: '#c79c6e'
};

export default class CardSearch extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onSearch = (search) => {
    // search must preserve query parameters since some children may rely
    // on them for 'storage'
    this.context.router.transitionTo(`/search/${search}`, this.props.location.query);
  }

  onSearchChange = (search) => {
    this.props.dispatch(searchChange(search, this.props.location.query));
  }

  render() {

    return (
      <div>
        <Search
          onSearch={ this.onSearch }
          value={ this.props.search }
          onChange={ this.onSearchChange } />
        <ClassToggles
          toggles={ Object.keys(COLORS).map(hero => ({
            id: hero.slice(0,4),
            label: hero,
            color: COLORS[hero]
          })) }
          { ...this.props } />
      </div>
    );
  }
}
