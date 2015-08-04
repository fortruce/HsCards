import React, { PropTypes } from 'react';

function cardImgUrl(id, size = 'original') {
  return `http://wow.zamimg.com/images/hearthstone/cards/enus/${size}/${id}.png`;
}

export default class Card extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['original', 'medium', 'small'])
  }

  render() {
    const { name, id } = this.props;
    return (
      <div>
        <img
            src={ cardImgUrl(id, this.props.size) }
            alt={ name } />
      </div>
    );
  }
}