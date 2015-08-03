import React, { PropTypes } from 'react/addons';
import { fetchOnUpdate } from '../../decorators';
import Card from '../atoms/Card';

@fetchOnUpdate(['search'], (params, actions) => {
  const { search } = params;
  actions.searchChange(search);
  actions.searchCards(search);
})
export default class Cards extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      search: PropTypes.string.isRequired
    }).isRequired,
    cards: PropTypes.array.isRequired
  }

  render() {
    const { cards } = this.props;
    return (
      <div>
        <h1>Cards: { this.props.params.search }</h1>
        <ul>
          { cards.map(card => <li key={card.id}><Card {...card} /></li>) }
        </ul>
      </div>
    );
  }
}