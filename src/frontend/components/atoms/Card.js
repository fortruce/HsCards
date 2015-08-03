import React, { PropTypes } from 'react';

function cardImgUrl(id) {
  return `http://wow.zamimg.com/images/hearthstone/cards/enus/original/${id}.png`;
}

export default class Card extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const { name, id } = this.props;
    return (
      <div>
        <img src={ cardImgUrl(id) } alt={ name } />
      </div>
    );
  }
}