import axios from 'axios';
import { USER_GET } from './types';

export const getLoginUser = () => {
  return async dispatch => {
    const res = await axios.get('/api/me');
    dispatch({
      type: USER_GET,
      payload: res.data
    });
  };
};
