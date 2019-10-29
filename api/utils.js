const models = require("./models");
const Sentry = require("@sentry/node");

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
    delete req.body.role;
    return next();
  },

  requireAdmin: function(req, res, next) {
    /* Read user from database, and make sure it is in fact an admin */
    try {
      models.HackerProfile.findAll({
        where: {
          userId: req.user.id
        }
      }).then(hackerProfile => {
        if (hackerProfile.role == "admin") {
          return next();
        } else {
          res.status(403).send("Unauthorized");
        }
      });
    } catch (e) {
      Sentry.captureException(e);
      res.status(403).send("Unauthorized");
    }
  }
};
