import axios from 'axios';
import { USER_GET } from './types';

export const listUser = () => {
  return async dispatch => {
    const res = await axios.get('/api/users');
    dispatch({
      type: USER_GET,
      payload: res.data
    });
  };
};
