import React, { PropTypes } from 'react';
import assign from 'object-assign';

import Toggle from '../atoms/Toggle';
import urlStorage from '../../decorators/urlStorage';

const URL_SEP = '+';

@urlStorage({
  classes: []
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
    return this.props.classes.length === 0 || this.props.classes.indexOf(id) !== -1;
  }

  toggle = (id, toggled) => {
    const ids = this.props.toggles.map(toggle => toggle.id);
    let classes = [...this.props.classes];
    if (classes.length === 0)
      classes = ids;
    if (toggled) {
      classes.push(id);
      if (classes.length === ids.length)
        classes = null;
    }
    else
      classes.splice(classes.indexOf(id), 1);
    this.props.change({ classes });
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