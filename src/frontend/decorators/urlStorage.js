import React, { PropTypes } from 'react';
import assign from 'object-assign';

export function uStorage(defaultState) {
  return DecoratedComponent => {
    class UStorageComponent extends React.Component {
      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      componentWillMount() {
        // initialize urlState with query params & defaultState
        const { query } = this.props.location;
        this.setState(query ? assign({}, defaultState, query) : defaultState);
      }

      componentWillReceiveProps(nProps) {
        const { query: newQuery } = nProps.location;
        const { query: oldQuery } = this.props.location;
        if (shallowEqual(newQuery, oldQuery))
          return;
        if (newQuery) {
          this.setState({

          })
        } else {
          this.setState()
        }
      }

      render() {
        let { query } = this.props.location;
        const data = assign({}, defaultState, query) || defaultState;

        return (
          <DecoratedComponent {...this.props}
                              {...data} />
        );
      }
    }
    DecoratedComponent.contextTypes = assign(
      {}, DecoratedComponent.contextTypes, { router: PropTypes.object.isRequired }
    );
    DecoratedComponent.prototype.componentWillMount = function() {
      console.log('overwritten will mount');
    }
    DecoratedComponent.prototype.urlState = defaultState;
    // redirect to the the merge of the old state with the new state
    // query state (redirected state) should remove deepEqual params that are
    // equivalent to the default state
    DecoratedComponent.prototype.setUrlState = function(nState) {
      console.log('set urlState:', nState);
      // merge previous state with new state
      this.urlState = assign({}, this.urlState, nState);
      let { query } = this.props.location;
      // merge new state with query params
      query = assign({}, query, this.urlState);
      this.context.router.transitionTo(
        this.props.location.pathname,
        query
      );
    }

    return UStorageComponent;
  }
}

//
// urlStorage decorates React components to store their state in the route
//
//  storageKey: String that represents the query parameter that should
//    be used to store the data in the route
//  serializeFn: Fn (Any) -> String
//    Must serialize the Component's data into a string to store in query params
//  deserializeFn: Fn (String) -> Any
//    Must deserialize the query param string back into data format for Component
//
//  Deserialized data is passed down to Component thru this.props.data
//  Component must use this.serialize to indicate state changes (a la this.setState)
//

export default function urlStorage(storageKey, serializeFn, deserializeFn) {
  return DecoratedComponent => {
    class UrlStorageComponent extends React.Component {
      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      render() {
        const { query } = this.props.location;
        const data = deserializeFn((query && query[storageKey]) || '[]');
        return (
          <DecoratedComponent
            data={ data }
            {...this.props} />
        );
      }
    }

    DecoratedComponent.contextTypes = assign(
      {},
      DecoratedComponent.contextTypes,
      { router: PropTypes.object.isRequired }
    );

    DecoratedComponent.prototype.setState = function(data) {
      let query = assign({}, this.props.location.query);
      const serializedData = serializeFn(data);
      if (serializedData)
        query = assign(query, { [storageKey]: serializedData });
      else
        delete query[storageKey];
      this.context.router.transitionTo(
        this.props.location.pathname,
        query
      );
    }

    return UrlStorageComponent;
  }
}