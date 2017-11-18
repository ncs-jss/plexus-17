import { USER_GET } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case USER_GET:
      return action.payload || false;
    default:
      return state;
  }
}
