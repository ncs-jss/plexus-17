import { EVENT_LIST, EVENT_GET } from '../actions/types';

const INITIAL_STATE = {
  eventList: {
    data: []
  },
  eventGet: {
    data: {}
  }
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === EVENT_LIST) {
    return {
      ...state,
      eventList: {
        data: action.payload
      }
    };
  }
  if (action.type === EVENT_GET) {
    return {
      ...state,
      eventGet: {
        data: action.payload
      }
    };
  }

  return state;
};
