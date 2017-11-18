import { EVENT_LIST } from '../actions/types';

export default (state = [], action) => {
  if (action.type === EVENT_LIST) {
    return action.payload || false;
  }
  return state;
};
