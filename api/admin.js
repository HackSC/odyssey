const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

// Full write access to a user's hackerProfile
router.put("/:email", async (req, res) => {
  const updatedhackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      email: req.params.email
    }
  });
  return res.json({ hackerProfile: newHackerProfile });
});

module.exports = router;
