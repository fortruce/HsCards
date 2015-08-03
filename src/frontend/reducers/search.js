import assign from 'object-assign';
import * as constants from '../constants';

const initialState = {
  cards: [],
  search: ''
};

const actionsMap = {
  [constants.SEARCH_CARDS]: (state, action) => ({ cards: action.cards }),
  [constants.SEARCH_CHANGE]: (state, action) => ({ search: action.search })
};

export default function search(state = initialState, action) {
  const fn = actionsMap[action.type];
  if (!fn)
    return state;

  return assign({}, state, fn(state, action));
}