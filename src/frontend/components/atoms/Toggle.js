import React, { PropTypes } from 'react';

export default class Toggle extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    toggled: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    color: PropTypes.string
  }

  render() {
    const { label, toggled } = this.props;
    const inputId = `__input__${label}`;
    const color = this.props.color || 'grey';
    return (
      <label htmlFor={ inputId }>
        <input
          id={ inputId }
          style={{ display: 'none' }}
          type="checkbox"
          checked={ toggled }
          value={ label }
          onChange={ () => this.props.onToggle(!this.props.toggled) } />
        <span style={{
          display: 'inline-block',
          color: toggled ? color : 'grey',
          textDecoration: toggled ? 'none' : 'line-through',
          fontWeight: 'bold',
          padding: '5px 10px',
          borderRadius: '100px',
          border: toggled ? `3px solid ${color}` : '3px solid grey'
        }}>{ label }</span>
      </label>
    );
  }
}