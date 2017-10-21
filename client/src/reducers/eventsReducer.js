import { FETCH_EVENTS } from '../actions/types';

export default (state = [], action) => {
  if (action.type === FETCH_EVENTS) {
    return action.payload || false;
  }
  return state;
};
