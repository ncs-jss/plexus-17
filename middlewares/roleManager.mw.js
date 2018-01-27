const isFunction = require('lodash/isFunction');

const isLogin = (req, res, next) => {
  const isMw = isFunction(next);
  const cond = req.user;
  if (isMw) {
    if (cond) {
      return next();
    }
    return res.status(401).send({
      error: 'You are not Logged In!'
    });
  } else {
    if (cond) {
      return true;
    }
    return false;
  }
};

const isRole = ({ role }) => (req, res, next) => {
  const isMw = isFunction(next);
  const cond = isLogin(req) && req.user.role === role;
  if (isMw) {
    if (cond) {
      return next();
    }
    return res.status(401).send({
      error: `You are not logged in as ${role}!`
    });
  } else {
    if (cond) {
      return true;
    }
    return false;
  }
};

const isSelf = (req, res, next) => {
  const isMw = isFunction(next);
  const cond = isLogin(req) && req.user[req.items.query_field || 'id'] === req.items.id;
  if (isMw) {
    if (cond) {
      return next();
    }
    return res.status(403).send({
      error: "You don't have the permission to do this"
    });
  } else {
    if (cond) {
      return true;
    }
    return false;
  }
};

const isRoleOrSelf = ({ role }) => (req, res, next) => {
  const isMw = isFunction(next);
  const cond = isSelf(req) || isRole(role)(req);
  if (isMw) {
    if (cond) {
      return next();
    }
    return res.status(403).send({
      error: "You don't have the permission to do this"
    });
  } else {
    if (cond) {
      return true;
    }
    return false;
  }
};

module.exports = {
  isLogin,
  isRole,
  isAdmin: isRole({ role: 'admin' }),
  isManager: isRole({ role: 'manager' }),
  isEditor: isRole({ role: 'editor' }),
  isSelf,
  isRoleOrSelf,
  isAdminOrSelf: isRoleOrSelf({ role: 'admin' })
};
