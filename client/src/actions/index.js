import axios from 'axios';
import { USER_GET, EVENT_LIST } from './types';

export const getLoginUser = () => {
  return async dispatch => {
    const res = await axios.get('/api/me');
    dispatch({
      type: USER_GET,
      payload: res.data
    });
  };
};

export const listUser = () => {
  return async dispatch => {
    const res = await axios.get('/api/users');
    dispatch({
      type: USER_GET,
      payload: res.data
    });
  };
};

export const createEvent = (values, history) => async dispatch => {
  const res = await axios.post('/api/events', values);
  history.push('/events');
  dispatch({
    type: USER_GET,
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

