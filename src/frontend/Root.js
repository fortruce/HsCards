import React, { PropTypes } from 'react';
import { Router, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import assign from 'object-assign';

import * as components from './components';
import * as reducers from './reducers';

// initialize redux devtools
let DEVTOOLS;
if (__DEV__) {
  DEVTOOLS = assign(
    {},
    require('redux-devtools/lib/react'),
    require('redux-devtools')
  );
}

const {
  Application,
  Explore,
  Cards
} = components;

const reducer = combineReducers(reducers);
let finalCreateStore;
// conditionally load redux devtools
if (__DEV__) {
  const { devTools, persistState } = DEVTOOLS;
  finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    createStore
  );
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore);
}
const store = finalCreateStore(reducer);

export default class Root extends React.Component {
  static PropTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;
    let elements = [
      <Provider store={ store } key="main">
        { renderRoutes.bind(null, history) }
      </Provider>
    ];
    if (__DEV__) {
      const { DevTools, DebugPanel, LogMonitor } = DEVTOOLS;
      elements.push(
        <DebugPanel key="debugPanel"
                    getStyle={ () => ({
                      background: 'black',
                      overflow: 'scroll',
                      opacity: 0.85,
                      fontSize: 16,
                      color: 'white',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 999,
                      position: 'fixed',
                      maxWidth: '400px'
                    })}>
          <DevTools store={ store }
                    monitor={ LogMonitor }
                    select={ state => ({
                      search: state.search.search,
                      filters: state.search.filters
                    })}/>
        </DebugPanel>
      );
    }
    return (
      <div>{ elements }</div>
    );
  }
}

function renderRoutes(history) {
  return (
    <Router history={ history }>
      <Route component={ Application }>
        <Route path='search' component={ Explore }>
          <Route path=':search' component={ Cards } />
        </Route>
      </Route>
      <Redirect from='/' to='/search' />
    </Router>
  );
}