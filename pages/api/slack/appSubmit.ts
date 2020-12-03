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
  const { firstName, lastName, school, year, ...body } = req.body;
  await app.start(3032);
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C01FUMML1JA", // #2021-app-announcements
      text: `${firstName} ${lastName} (${year}) has submit an application!`,
    });
  } catch (error) {
    console.error(error);
    res.end(500);
  }

  await app.stop();
  res.json({ status: "success" });
};
