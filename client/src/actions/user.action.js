import { default as request } from 'superagent';
import { USER_GET } from './types';

export const listUser = () => {
  return async dispatch => {
    const res = await request.get('/api/users');
    dispatch({
      type: USER_GET,
      payload: res.body
    });
  };
};
