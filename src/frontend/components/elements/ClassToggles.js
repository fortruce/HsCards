import React, { PropTypes } from 'react';
import assign from 'object-assign';

import Toggle from '../atoms/Toggle';

const URL_SEP = '+';

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
    const { query } = this.props.location;
    if (query && query.classes) {
      // classes=drui,mage,warr indicates druid mage and warrior toggled
      return query.classes.split(URL_SEP).indexOf(id) !== -1;
    }
    // by default all are toggled
    return true;
  }

  toggle = (id, toggled) => {
    const { pathname, query } = this.props.location;
    // extract the classes from the query
    // if there is not a classes query present, then all are toggled
    let heroes = ( query && query.classes && query.classes.split(URL_SEP)) ||
                 this.props.toggles.map(toggle => toggle.id);

    if (toggled) {
      heroes.push(id);
    }
    else {
      heroes = heroes.filter(hId => hId !== id);
    }

    // if all classes are toggled revert to no classes specified
    if (heroes.length === this.props.toggles.length) {
      let newQuery = assign({}, query);
      delete newQuery['classes'];
      return this.context.router.transitionTo(
        pathname,
        newQuery
      );
    }

    this.context.router.transitionTo(
      pathname,
      assign({}, query, { classes: heroes.join(URL_SEP) })
    );
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