import { default as request } from 'superagent';
import { EVENT_LIST, EVENT_GET } from './types';

export const createEvent = (values, history) => async dispatch => {
  const res = await request.post('/api/events').send(values);
  history.push('/events');
  dispatch({
    type: EVENT_LIST,
    payload: res.data
  });
};

export const listEvent = ({ limit = 10, skip = 0, fields = {}, include = [] } = {}) => async dispatch => {
  const res = await request.get('/api/events/').query({
    limit,
    skip,
    fields,
    include
  });
  dispatch({
    type: EVENT_LIST,
    payload: res.body
  });
};

export const getEvent = (id, { fields = {}, preset, include = [], query_field } = {}) => async dispatch => {
  const res = await request.get(`/api/events/${id}`).query({
    fields,
    include,
    query_field
  });
  dispatch({
    type: EVENT_GET,
    payload: res.body
  });
};
