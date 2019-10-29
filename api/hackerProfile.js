const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");

// For hacker writeable routes, we need to redact certain info
// to prevent hackers from writing info they shouldn't
function preprocessRequest(req, res, next) {
  delete req.body.status;
  delete req.body.userId;
  delete req.body.email;
  return next();
}

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findAll({
    where: {
      userId: req.user.id
    }
  });
  return res.json({ hackerProfile });
});

router.post("/", async (req, res) => {
  /* Prevents hackers from posting with status, this will be filled on admin routes */
  delete req.body.status;
  const hackerProfile = await models.HackerProfile.create({
    userId: req.user.id,
    email: req.user._json.email,

    ...req.body
  });
  return res.json({ hackerProfile });
});

router.put("/", async (req, res) => {
  delete req.body.status;
  const newHackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      userId: req.user.id
    }
  });
  return res.json({ hackerProfile: newHackerProfile });
});

module.exports = router;
