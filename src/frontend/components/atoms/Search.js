import React, { PropTypes } from 'react';

export default class Search extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13)
      this.props.onSearch(this.props.value.trim());
  }

  render() {
    return (
      <input type="text"
             value={ this.props.value }
             onKeyUp={ this.onKeyUp }
             onChange={ (e) => this.props.onChange(e.target.value.trim()) } />
    );
  }
}