const { App, LogLevel } = require("@slack/bolt");
const dotenv = require("dotenv");
const models = require("../models");

dotenv.config();

// Disable body parser
export const config = {
  api: {
    bodyParser: true,
  },
};

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default async (req, res) => {
  if (req.method === "POST") {
    // This endpoint will be hit by the slack bot
    const userId = req.body.user_id;
    const email = req.body.text;

    if (!validateEmail(email)) {
      return res.json({ text: "Please enter a valid email address!" });
    }

    const hackers = await models.HackerProfile.findAll({
      where: {
        email: email,
      },
    });

    return res.json({ text: "Thanks for checking in! You're ready to go." });
  }
};
