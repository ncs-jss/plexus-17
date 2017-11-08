module.exports = {
  isLogin(req, res, next) {
    if (!req.user) {
      return res.status(401).send({
        error: 'You are not Logged In!'
      });
    }
    next();
  },
  isAdmin(req, res, next) {
    if (!(req.user && req.user.role === 'admin')) {
      return res.status(401).send({
        error: 'You are not logged in as admin!'
      });
    }
    next();
  },
  isManager(req, res, next) {
    if (!(req.user && req.user.role === 'manager')) {
      return res.status(401).send({
        error: 'You are not logged in as manager!'
      });
    }
    next();
  },
  isEditor(req, res, next) {
    if (!(req.user && req.user.role === 'editor')) {
      return res.status(401).send({
        error: 'You are not logged in as editor!'
      });
    }
    next();
  }
};
