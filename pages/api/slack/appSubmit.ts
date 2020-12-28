import { App, LogLevel } from "@slack/bolt";
import dotenv from "dotenv";

export const config = {
  api: {
    bodyParser: false,
  },
};

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
});

export default async (req, res) => {
  if (!process.env.SLACK_BOT_TOKEN || !process.env.SIGNING_SECRET) {
    res.json({
      status: "error",
      message: "Missing required environment variables.",
    });
  }

  const { firstName, lastName, school, year, ...body } = req.body;
  if (!firstName || !lastName || !school) {
    res.json({
      status: "error",
      message:
        "Missing required information to send application to Slack. Verify app is valid?",
    });
  }

  await app.start(3032);
  const isProd = process.env.NODE_ENV === "production";

  const notProdMsg = `[notice: NODE_ENV is ${process.env.NODE_ENV}] `;
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C01FUMML1JA", // #2021-app-announcements
      text: ``,
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: `${
              !isProd ? notProdMsg : ""
            }${firstName} ${lastName} has submit their application!`,
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `A ${year} at ${school} studying ${body.major}`,
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.end(500);
  }

  await app.stop();
  res.json({ status: "success" });
};
