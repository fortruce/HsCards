import React, { PropTypes } from 'react';

export default class Search extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13)
      this.props.onSearch(this.state.value.trim());
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <input type="text"
             value={ this.state.value }
             onKeyUp={ this.onKeyUp }
             onChange={ this.onChange } />
    );
  }
}