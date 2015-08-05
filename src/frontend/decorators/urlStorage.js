import React, { PropTypes } from 'react';
import assign from 'object-assign';

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
        const data = deserializeFn((query && query[storageKey]) || '');
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

    DecoratedComponent.prototype.serialize = function(data) {
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