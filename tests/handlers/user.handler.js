const { baseUrl, request, cookies } = require('./config');

const apiUrl = baseUrl + '/users';

const list = options => {
  return request
    .get(apiUrl)
    .query({
      limit: 10,
      skip: 0
    })
    .set('Cookie', cookies.admin)
    .expect(200)
    .expect('Content-Type', /json/);
};

const get = (id, options) => {
  console.log(`${apiUrl}/${id}`);
  return request
    .get(`${apiUrl}/${id}`)
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
