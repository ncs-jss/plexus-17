import { default as request } from 'superagent';

import { USER_GET } from './types';

export const getLoginUser = () => {
  return async dispatch => {
    const res = await request.get('/api/me');
    dispatch({
      type: USER_GET,
      payload: res.body
    });
  };
};
