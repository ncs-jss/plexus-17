import axios from 'axios';
import { EVENT_LIST } from './types';

export const createEvent = (values, history) => async dispatch => {
  const res = await axios.post('/api/events', values);
  history.push('/events');
  dispatch({
    type: EVENT_LIST,
    payload: res.data
  });
};

export const listEvent = () => async dispatch => {
  const res = await axios.get('/api/events');
  dispatch({
    type: EVENT_LIST,
    payload: res.data
  });
};
