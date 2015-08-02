import assign from 'object-assign';
import * as constants from '../constants';

const initialState = {
  cards: []
};

const actionsMap = {
  [constants.SEARCH_CARDS]: (state, action) => ({ cards: action.cards })
};

export default function cards(state = initialState, action) {
  const fn = actionsMap[action.type];
  if (!fn)
    return state;

  return assign({}, state, fn(state, action));
}