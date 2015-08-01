import React from 'react';
import 'whatwg-fetch'; //polyfill

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };

    fetch('/api/cards')
      .then(resp => resp.json())
      .then(cards => cards.map(c => {
        let { name, set, type, id } = c;
        return { name, set, type, id };
      }))
      .then(cards => this.setState({ cards }));
  }

  render() {
    return (
      <div>
        <h1>Cards</h1>
        <p>Total: { this.state.cards.length }</p>
        <ul>
          { this.state.cards.map(card => <li>{JSON.stringify(card)}</li>) }
        </ul>
      </div>
    );
  }
}