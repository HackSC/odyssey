const express = require("express");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/", (req, res) => {
  return res.json({
    message: "GET /api/team/"
  });
});

module.exports = router;
