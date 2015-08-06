import { uStorage } from '../../decorators/urlStorage';
import React, { PropTypes } from 'react';

@uStorage({
  myArray: [1, 2, 3],
  anotherObj: { test: 'value' }
})
export default class Test extends React.Component {
  render() {
    return (
      <div>
        <p>myArray</p>
        <ul>{ this.props.myArray.map(e => <li>{e}</li>)}</ul>
        <p onClick={ () => this.setState({ anotherObj: { test: 'hello'} })}>anotherObj: { this.props.anotherObj.test }</p>
        <button onClick={ () => this.setState({ myArray: this.state.myArray.map(i => i*2) })}>
          mult
        </button>
      </div>
    );
  }
}