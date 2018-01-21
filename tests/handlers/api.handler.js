const { baseUrl, request, cookies } = require('./config');

module.exports = entity => {
  const apiUrl = `${baseUrl}/${entity}`;

  const list = ({ limit = 10, skip = 0, fields = {}, include = [] } = {}) => {
    return request
      .get(apiUrl)
      .query({ limit, skip, fields, include })
      .set('Cookie', cookies.admin)
      .expect(200)
      .expect('Content-Type', /json/);
  };

  const get = (id, { fields = {}, preset, include = [], query_field } = {}) => {
    return request
      .get(`${apiUrl}/${id}`)
      .query({ fields, preset, include, query_field })
      .set('Cookie', cookies.admin)
      .expect(200)
      .expect('Content-Type', /json/);
  };

  const create = () => {};

  const update = () => {};

  const remove = () => {};

  return {
    list,
    get,
    create,
    update,
    remove
  };
};
