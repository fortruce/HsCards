import React, { PropTypes } from 'react';
import assign from 'object-assign';

import Toggle from '../atoms/Toggle';
import urlStorage from '../../decorators/urlStorage';

const URL_SEP = '+';

@urlStorage('classes',
  (data) => {
    // return data.join(URL_SEP);
    return JSON.stringify(data);
  },
  (data) => {
    // return data ? data.split(URL_SEP) : [];
    return JSON.parse(data);
  })
export default class ClassToggles extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    toggles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        color: PropTypes.string
      })
    ).isRequired,
    location: PropTypes.shape({
      query: PropTypes.object
    }).isRequired
  }

  isToggled = (id) => {
    return this.props.data.length === 0 || this.props.data.indexOf(id) !== -1;
  }

  toggle = (id, toggled) => {
    let data = [...this.props.data];
    if (toggled){
      data.push(id);
      // if all are enabled, then use shortcut of none explictly enabled = all enabled
      if (data.length === toggled.length)
        data = [];
    }
    else if (data.length === 0) {
      // default is all enabled when none are specified, to disable 
      // just 1 in this case we must explictly enable all of the other toggles
      data = this.props.toggles
              .map(({id}) => id)
              .filter(did => did !== id);
    }
    else {
      data = data.filter(did => did !== id);
    }
    this.setState(data);
  }

  render() {
    return (
      <div>
        {
          this.props.toggles
            // cache isToggled for each toggle to use for sorting & display
            .map(toggle => assign({}, toggle, {
              toggled: this.isToggled(toggle.id)
            }))
            // sort active toggles in front of disabled toggles
            .sort((a, b) => {
              if (a.toggled && !b.toggled)
                return -1;
              if ((a.toggled && b.toggled) ||
                  (!a.toggled && !b.toggled))
                return 0;
              else
                return 1;
            })
            .map(({ toggled, id, color, label }) => (
              <div
                key={ id }
                style={{
                  display: 'inline-block',
                  margin: '5px'
                }}>
                <Toggle
                  label={ label }
                  color={ color }
                  toggled={ toggled }
                  onToggle={ toggled => this.toggle(id, toggled) } />
              </div>
            ))
        }
      </div>
    );
  }
}