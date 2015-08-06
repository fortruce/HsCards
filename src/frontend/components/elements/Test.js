import { uStorage } from '../../decorators/urlStorage';
import React, { PropTypes } from 'react';

@uStorage({
  myArray: [1, 2, 3],
  anotherObj: { test: 'value' }
})
export default class Test extends React.Component {
  componentWillMount() {
    console.log('normal will mount');
  }
  render() {
    return (
      <div>
        <p>myArray</p>
        <ul>{ this.props.myArray.map(e => <li>{e}</li>)}</ul>
        <p onClick={ () => this.setUrlState({ anotherObj: { test: 'hello'} })}>anotherObj: { this.props.anotherObj.test }</p>
        <button onClick={ () => this.setUrlState({ myArray: this.urlState.myArray.map(i => i*2) })}>
          mult
        </button>
      </div>
    );
  }
}