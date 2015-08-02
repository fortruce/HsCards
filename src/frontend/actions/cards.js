import 'whatwg-fetch';
import * as constants from '../constants';

export function searchCards(search) {
  return dispatch => {
    fetch(`/api/cards/${search}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch({
          type: constants.SEARCH_CARDS,
          cards: json
        })
      });
  }
}