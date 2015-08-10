import React, { PropTypes } from 'react';
import assign from 'object-assign';
import shallowEqual from 'shallowequal';

export default function urlStorage(defaultState) {
  return DecoratedComponent => {
    class UStorageComponent extends React.Component {
      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      constructor(props) {
        super(props);
        // must scope urlState in this.props.urlState property instead of as this.state
        // to allow for resetting urlState with empty query params
        // this.setState({ urlState: {} }) resets urlState to an empty object
        // this.setState({}) does nothing and will not reset other state keys as
        //  desired
        this.state = { urlState: {} };
      }

      componentWillReceiveProps(nProps) {
        // load query params into state from location props
        const { query } = nProps.location;
        this.setState({ urlState: query || {} });
      }

      _changeUrlState(nState) {
        // merge the new state with the previous state, then
        // remove all keys where new state === null
        let mergedState = assign({}, this.state.urlState, nState);
        mergedState = Object.keys(mergedState).reduce((o, key) => {
          if (nState[key] !== null)
            o[key] = mergedState[key];
          return o;
        }, {});
        this.context.router.transitionTo(
          this.props.location.pathname,
          mergedState
        );
      }

      render() {
        return (
          <DecoratedComponent {...this.props}
                              {...defaultState}
                              {...this.state.urlState}
                              change={ (s) => this._changeUrlState(s) } />
        );
      }
    }
    return UStorageComponent;
  }
}