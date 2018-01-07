const { baseUrl, request, cookies } = require('./config');

const apiUrl = baseUrl + '/events';

const list = options => {
  return request
    .get(apiUrl)
    .query(options)
    .set('Cookie', cookies.admin)
    .expect(200)
    .expect('Content-Type', /json/);
};

const get = (id, options) => {
  return request
    .get(`${apiUrl}/${id}`)
    .query(options)
    .set('Cookie', cookies.admin)
    .expect(200)
    .expect('Content-Type', /json/);
};

const create = () => {};

const update = () => {};

const remove = () => {};

module.exports = {
  list,
  get,
  create,
  update,
  remove
};
