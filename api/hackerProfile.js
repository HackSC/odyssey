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
      email: req.user._json.email,
      status: req.user._json.email_verified ? "verified" : "unverified"
    },
    include: [
      {
        model: models.Team,
        as: "team"
      }
    ]
  });

  hackerProfile.referred = await hackerProfile.getReferred();

  if (hackerProfile.status === "unverified" && req.user._json.email_verified) {
    // Update hacker profile
    try {
      hackerProfile.status = "verified";
      await hackerProfile.save();
      return res.json({ hackerProfile });
    } catch (exception) {
      return res.status(500).json({
        message: "Error trying to save profile",
        exception
      });
    }
  }

  return res.json({ hackerProfile });
});

router.put("/", async (req, res) => {
  // Get the users current hacker profile
  const currentHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  const formInput = req.body;

  // If the user is saving a profile, make sure that they have not already submitted one before
  if (currentHackerProfile.submittedAt !== null) {
    return res.status(400).json({
      error: "You have already submitted an application"
    });
  }

  // Only allow certain fields for form input
  const allowedFields = new Set([
    "gender",
    "ethnicity",
    "email",
    "major",
    "minor",
    "skills",
    "interests",
    "firstName",
    "resume",
    "lastName",
    "phoneNumber",
    "school",
    "year",
    "skillLevel",
    "graduationDate",
    "over18",
    "needBus",
    "links",
    "questionOne",
    "questionTwo",
    "questionThree",
    "codeOfConduct",
    "authorize",
    "marketing",
    "submit",
    "referrerCode"
  ]);

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`
      });
    }
  }

  // TODO: Validate inputs

  const updatedProfileFields = {
    ...formInput
  };

  /*
    Advance the user in the application process if they meet the following conditions
    - Have previously not submitted a profile
    - Have filled out all of the required fields 
  */

  if (formInput.submit) {
    if (currentHackerProfile.submittedAt === null) {
      if (
        formInput.gender &&
        formInput.ethnicity &&
        formInput.major &&
        formInput.firstName &&
        formInput.lastName &&
        formInput.phoneNumber &&
        formInput.school &&
        formInput.skillLevel &&
        formInput.graduationDate &&
        formInput.over18 &&
        formInput.questionOne &&
        formInput.questionTwo &&
        formInput.questionThree &&
        formInput.codeOfConduct &&
        formInput.authorize
      ) {
        updatedProfileFields.submittedAt = new Date();
        updatedProfileFields.status = "submitted";
      } else {
        return res.status(400).json({
          error: "Not all required fields are filled out"
        });
      }
    }
  }

  // Update, then re-retrieve the updated hacker profile
  await models.HackerProfile.update(updatedProfileFields, {
    where: {
      userId: req.user.id
    }
  });

  const updatedHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  return res.json({ hackerProfile: updatedHackerProfile });
});

// Direct patch the referrerCode if there isn't one
router.put("/referrerCode", async (req, res) => {
  const referrerCode = req.body.referrerCode;

  const currentHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  const currentReferrerCode = currentHackerProfile.referrerCode;

  if (!currentReferrerCode || currentReferrerCode == "") {
    const updatedFields = { referrerCode };

    await models.HackerProfile.update(updatedFields, {
      where: {
        userId: req.user.id
      }
    });
  }

  return res.send();
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
      Key: user.id,
      Body: file.data
    };

    s3.upload(params, function(err, data) {
      if (!err) {
        models.HackerProfile.update(
          { resume: data.Location },
          {
            where: {
              userId: req.user.id
            }
          }
        )
          .then(updatedProfile => {
            res.json({ hackerProfileUpdate: updatedProfile });
          })
          .catch(e => {
            res.status(500).json({ error: e });
          });
      } else {
        res.json(500, { message: "Failed to upload Resume" });
      }
    });
  }
});

// Confirmation and declination routes
router.post("/confirm", (req, res) => {
  const { body, files, user } = req;

  if (
    body["travelMethod"] &&
    files &&
    files["travelPlan"] &&
    body["shirtSize"] &&
    body["codeOfConduct"]
  ) {
    // All required fields are in the request body
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET
    });

    const file = files.travelPlan;
    const fileExtension = file.name.split(".").slice(-1)[0];

    const params = {
      Bucket: "hacksc-odyssey",
      Key: "confirmation-proof/" + user.id + "." + fileExtension,
      Body: file.data
    };

    s3.upload(params, function(err, data) {
      if (!err) {
        // Create dietary restrictions string
        const dietaryRestrictions = [];
        if (body["dietaryRestrictions.vegetarian"] === "true")
          dietaryRestrictions.push("vegetarian");
        if (body["dietaryRestrictions.vegan"] === "true")
          dietaryRestrictions.push("vegan");
        if (body["dietaryRestrictions.halal"] === "true")
          dietaryRestrictions.push("halal");
        if (body["dietaryRestrictions.kosher"] === "true")
          dietaryRestrictions.push("kosher");
        if (body["dietaryRestrictions.nutAllergy"] === "true")
          dietaryRestrictions.push("nutAllergy");
        if (body["dietaryRestrictions.lactoseIntolerant"] === "true")
          dietaryRestrictions.push("lactoseIntolerant");
        if (body["dietaryRestrictions.glutenFree"] === "true")
          dietaryRestrictions.push("glutenFree");
        if (
          body["dietaryRestrictions.other"] &&
          body["dietaryRestrictions.other"].trim() !== ""
        )
          dietaryRestrictions.push(body["dietaryRestrictions.other"]);

        models.HackerProfile.update(
          {
            travelOrigin: body["travelOrigin"] || null,
            travelMethod: body["travelMethod"],
            shirtSize: body["shirtSize"],
            travelPlan: data.Location,
            dietaryRestrictions: dietaryRestrictions.join(" "),
            confirmCodeOfConduct:
              body["codeOfConduct"] === "true" ? true : false,
            status: "confirmed",
            noBusCheck: body["noBusCheck"] === "true" ? true : false,
            confirmedAt: new Date()
          },
          {
            where: {
              userId: req.user.id,
              status: "accepted"
            }
          }
        )
          .then(updatedProfile => {
            res.json({ hackerProfileUpdate: updatedProfile });
          })
          .catch(e => {
            res.status(500).json({ error: e });
          });
      } else {
        res.json(500, { message: "Failed to upload confirmation proof" });
      }
    });
  } else {
    return res.json(500, {
      message: "Failed to confirm attendance, missing fields"
    });
  }
});

router.post("/decline", async (req, res) => {
  await models.HackerProfile.update(
    {
      status: "declined",
      declinedAt: new Date()
    },
    {
      where: {
        userId: req.user.id,
        status: "accepted"
      }
    }
  );

  return res.json({
    message: "Successfully processed request to decline HackSC 2020 acceptance"
  });
});

router.post("/undecline", async (req, res) => {
  await models.HackerProfile.update(
    {
      status: "accepted",
      declinedAt: null
    },
    {
      where: {
        userId: req.user.id,
        status: "declined"
      }
    }
  );

  return res.json({
    message:
      "Successfully processed request to un-decline HackSC 2020 acceptance"
  });
});

module.exports = router;
