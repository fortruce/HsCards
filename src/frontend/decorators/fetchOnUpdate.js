import React, { PropTypes } from 'react';
import assign from 'object-assign';
import shallowEqual from 'shallowequal';

function mapParams(keys, params) {
  return keys.reduce((acc, key) => {
    return assign({}, acc, { [key]: params[key] });
  }, {});
}

// fetchOnUpdate calls the associated fetch fn with the new params
// each time the component receives new props
//
// Use to call action creators to keep flux store data in sync with route
// changes that either render the component for the first time or just push
// new props to the component.
export default function fetchOnUpdate(paramKeys, fn) {
  return DecoratedComponent => {
    class FetchOnUpdateDecorator extends React.Component {
      componentWillMount() {
        fn(mapParams(paramKeys, this.props.params), this.props.actions);
      }

      componentDidUpdate(prevProps) {
        const params = mapParams(paramKeys, this.props.params);
        const prevParams = mapParams(paramKeys, prevProps.params);

        if (!shallowEqual(params, prevParams))
          fn(params, this.props.actions);
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    }

    DecoratedComponent.propTypes = assign({}, DecoratedComponent.propTypes, {
      actions: PropTypes.object.isRequired
    });

    return FetchOnUpdateDecorator;
  }
}