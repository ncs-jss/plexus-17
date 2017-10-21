module.exports = (req, res, next) => {
  if (!(req.user && req.user.role === 'admin')) {
    return res.status(401).send({
      error: 'You are not logged in as admin!'
    });
  }
  next();
};
