import React, { PropTypes } from 'react';
import { Router, Route, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as components from './components';
import * as reducers from './reducers';

const {
  Application,
  Explore,
  Cards
} = components;

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

export default class Root extends React.Component {
  static PropTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;
    return (
      <Provider store={ store }>
        { renderRoutes.bind(null, history) }
      </Provider>
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