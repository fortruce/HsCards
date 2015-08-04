import React, { PropTypes } from 'react';
import { Router, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';

import * as components from './components';
import * as reducers from './reducers';

const {
  Application,
  Explore,
  Cards
} = components;

const reducer = combineReducers(reducers);
const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);
const store = finalCreateStore(reducer);

export default class Root extends React.Component {
  static PropTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Provider store={ store }>
          { renderRoutes.bind(null, history) }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={ store }
                    monitor={ LogMonitor }
                    select={ state => state.search.filters } />
        </DebugPanel>
      </div>
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