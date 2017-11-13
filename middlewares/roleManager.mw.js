const isFunction = require('lodash/isfunction');

function isRole(role, req, res, next) {
  const isMw = isFunction(next);
  if (!(req.user && req.user.role === role)) {
    if (isMw) {
      return res.status(401).send({
        error: `You are not logged in as ${role}!`
      });
    }
    return false;
  }
  if (isMw) {
    return next();
  }
  return true;
}

module.exports = {
  isLogin(req, res, next) {
    const isMw = isFunction(next);
    if (!req.user) {
      if (isMw) {
        return res.status(401).send({
          error: 'You are not Logged In!'
        });
      }
      return false;
    }
    if (isMw) {
      return next();
    }
    return true;
  },
  isRole,
  isAdmin(...args) {
    return isRole('admin', ...args);
  },
  isManager(...args) {
    return isRole('manager', ...args);
  },
  isEditor(...args) {
    return isRole('editor', ...args);
  },
  isSelf(req, res, next) {
    const isMw = isFunction(next);
    if (req.user.id !== req.items.id) {
      if (isMw) {
        return res.status(403).send({
          error: "You don't have the permission to do this"
        });
      }
      return false;
    }
    if (isMw) {
      return next();
    }
    return true;
  },
  isAdminOrSelf(req, res, next) {
    const isMw = isFunction(next);
    if (req.user.role !== 'admin' && req.user.id !== req.items.id) {
      if (isMw) {
        return res.status(403).send({
          error: "You don't have the permission to do this"
        });
      }
      return false;
    }
    if (isMw) {
      return next();
    }
    return true;
  }
};
