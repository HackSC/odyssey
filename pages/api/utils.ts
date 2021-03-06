const models = require("./models");
const Sentry = require("@sentry/node");

// To be used in Next.js API routes not running express router
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const authMiddleware = function (req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(400).send("Unauthorized");
};

const preprocessRequest = function (req, res, next) {
  delete req.body.status;
  delete req.body.userId;
  delete req.body.email;
  delete req.body.role;
  return next();
};

const requireAdmin = function (req, res, next) {
  /* Read user from database, and make sure it is in fact an admin */
  try {
    models.HackerProfile.findAll({
      where: {
        userId: req.user.id,
      },
    }).then((hackerProfiles) => {
      if (hackerProfiles.length >= 1) {
        if (hackerProfiles[0].get("role") === "admin") {
          return next();
        } else {
          res.status(400).send("Unauthorized: Incorrect role");
        }
      } else {
        res.status(400).send("Unauthorized; profile not found");
      }
    });
  } catch (e) {
    Sentry.captureException(e);
    res.status(400).send("Unauthorized");
  }
};

const requireVolunteer = function (req, res, next) {
  /* Read user from database, and make sure it is in fact an volunteer */
  try {
    models.HackerProfile.findAll({
      where: {
        userId: req.user.id,
      },
    }).then((hackerProfiles) => {
      if (hackerProfiles.length >= 1) {
        if (hackerProfiles[0].get("role") === "volunteer") {
          return next();
        } else {
          res.status(400).send("Unauthorized: Incorrect role");
        }
      } else {
        res.status(400).send("Unauthorized; profile not found");
      }
    });
  } catch (e) {
    Sentry.captureException(e);
    res.status(400).send("Unauthorized");
  }
};

const requireSponsor = function (req, res, next) {
  /* Read user from database, and make sure it is in fact an sponsor */
  try {
    models.HackerProfile.findAll({
      where: {
        userId: req.user.id,
      },
    }).then((hackerProfiles) => {
      if (hackerProfiles.length >= 1) {
        if (hackerProfiles[0].get("role") === "sponsor") {
          return next();
        } else {
          res.status(400).send("Unauthorized: Incorrect role");
        }
      } else {
        res.status(400).send("Unauthorized; profile not found");
      }
    });
  } catch (e) {
    Sentry.captureException(e);
    res.status(400).send("Unauthorized");
  }
};

const requireNonHacker = function (req, res, next) {
  /* Read user from database, and make sure it is in fact not a hacker */
  try {
    models.HackerProfile.findAll({
      where: {
        userId: req.user.id,
      },
    }).then((hackerProfiles) => {
      if (hackerProfiles.length >= 1) {
        if (hackerProfiles[0].get("role") !== "hacker") {
          // Add role to be used
          req.user.role = hackerProfiles[0].get("role");
          return next();
        } else {
          res.status(400).send("Unauthorized: Incorrect role");
        }
      } else {
        res.status(400).send("Unauthorized; profile not found");
      }
    });
  } catch (e) {
    Sentry.captureException(e);
    res.status(400).send("Unauthorized");
  }
};

const requireDevelopmentEnv = function (req, res, next) {
  if (process.env.NODE_ENV == "production") {
    return res.redirect("/");
  }
  return next();
};

export {
  runMiddleware,
  authMiddleware,
  preprocessRequest,
  requireAdmin,
  requireVolunteer,
  requireSponsor,
  requireNonHacker,
  requireDevelopmentEnv,
};
