import { default as request } from 'superagent';

import { AUTH_GET } from './types';

export const getLoginUser = () => {
  return async dispatch => {
    const res = await request.get('/api/me');
    dispatch({
      type: AUTH_GET,
      payload: res.body
    });
  };
};
