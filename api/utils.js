module.exports = {
  authMiddleware: function(req, res, next) {
    if (req.user) {
      return next();
    }
    res.status(403).send("Unauthorized");
  },
  preprocessRequest: function(req, res, next) {
    delete req.body.status;
    delete req.body.userId;
    delete req.body.email;
    return next();
  }
};
