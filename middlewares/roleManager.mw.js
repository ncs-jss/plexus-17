function isRole(role, req, res, next) {
  if (!(req.user && req.user.role === role)) {
    return res.status(401).send({
      error: `You are not logged in as ${role}!`
    });
  }
  next();
}

module.exports = {
  isLogin(req, res, next) {
    if (!req.user) {
      return res.status(401).send({
        error: 'You are not Logged In!'
      });
    }
    next();
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
    console.log(req.items);
  },
  isAdminOrSelf(req, res, next) {
    if (req.user.role !== 'admin' && req.user.id !== req.items.id) {
      return res.status(403).send({
        error: "You don't have the permission to do this"
      });
    }
    next();
  }
};
