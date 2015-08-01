import React from 'react';
import 'whatwg-fetch'; //polyfill

export default class Application extends React.Component {
  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}