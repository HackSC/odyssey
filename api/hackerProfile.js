const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/", async (req, res) => {
  const [hackerProfile] = await models.HackerProfile.findOrCreate({
    where: {
      userId: req.user.id
    },
    defaults: {
      email: req.user._json.email
    }
  });

  return res.json({ hackerProfile });
});

router.put("/", async (req, res) => {
  // TODO: Do input validation
  const newHackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      userId: req.user.id
    }
  });
  return res.json({ hackerProfile: newHackerProfile });
});

router.post("/resume", utils.authMiddleware, async (req, res) => {
  const user = req.user;
  if (req.files) {
    const file = req.files.file;
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET
    });
    const params = {
      Bucket: "hacksc-odyssey",
      Key: file.name,
      Body: file.data
    };
    s3.upload(params, function(err, data) {
      if (!err) {
        res.json({ data });
      } else {
        return res.json(400, {
          error: 1,
          msg: "S3 Upload Failure"
        });
      }
    });
  }
});

router.put("/application", async (req, res) => {
  // Get the users current hacker profile
  const currentHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  const formInput = req.body;

  // If the user is saving an application, make sure that they have not already submitted one before
  if (currentHackerProfile.applicationSubmittedAt !== null) {
    return res.status(400).json({
      error: "You have already submitted an application"
    });
  }

  // Only allow certain fields for form input
  const allowedFields = new Set([
    "questionOne",
    "questionTwo",
    "questionThree",
    "codeOfConduct",
    "authorize",
    "submit"
  ]);

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`
      });
    }
  }

  // TODO: Validate inputs

  const updatedApplicationFields = {
    ...formInput
  };

  /*
    Advance the user in the application process if they meet the following conditions
    - Have previously not submitted an application
    - Have filled out all of the required fields 
  */

  if (formInput.submit) {
    if (currentHackerProfile.applicationSubmittedAt === null) {
      if (
        formInput.questionOne &&
        formInput.questionTwo &&
        formInput.questionThree &&
        formInput.codeOfConduct &&
        formInput.authorize
      ) {
        updatedApplicationFields.applicationSubmittedAt = new Date();
        updatedApplicationFields.status = "applicationSubmitted";
      } else {
        return res.status(400).json({
          error: "Not all required fields are filled out"
        });
      }
    } else {
      return res.status(400).json({
        error: "You have already submitted an application"
      });
    }
  }

  // Update, then re-retrieve the updated hacker profile
  await models.HackerProfile.update(updatedApplicationFields, {
    where: {
      userId: req.user.id
    }
  });

  const updatedHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  return res.json({ hackerProfile: updatedHackerProfile });
});

module.exports = router;
