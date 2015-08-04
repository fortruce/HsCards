import React, { PropTypes } from 'react';

export default class ToggleFilter extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    toggled: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  }

  render() {
    const { label, toggled } = this.props;
    return (
      <div
        style={{ backgroundColor: toggled ? 'red' : 'inherit' }}
        onClick={ () => this.props.onToggle(!this.props.toggled) }  >
        { label }
      </div>
    );
  }
}