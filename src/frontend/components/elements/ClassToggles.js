import React, { PropTypes } from 'react';
import assign from 'object-assign';

import Toggle from '../atoms/Toggle';


export default class ClassToggles extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    toggles: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        color: PropTypes.string
      })
    ).isRequired,
    location: PropTypes.shape({
      query: PropTypes.object
    }).isRequired
  }

  render() {
    return (
      <div>
        {
          this.props.toggles
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
            .map(({ toggled, color, label, toggle }) => (
              <div
                key={ label }
                style={{
                  display: 'inline-block',
                  margin: '5px'
                }}>
                <Toggle
                  label={ label }
                  color={ color }
                  toggled={ toggled }
                  onToggle={ toggled => toggle(toggled) } />
              </div>
            ))
        }
      </div>
    );
  }
}