const { App, LogLevel } = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

// Disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

async function fetchUsers(conversationId) {
  try {
    const result = await app.client.conversations.members({
      token: process.env.SLACK_BOT_TOKEN,
      channel: conversationId,
    });
    return result.members;
  } catch (error) {
    console.error(error);
  }
}

export default async (req, res) => {
  if (req.method === "POST") {
    const conversationId = req.body.conversationId;
    await app.start(3031);
    const users = await fetchUsers(conversationId);
    await app.stop();
    res.setHeader("Content-Type", "application/json");
    res.json({ users: users });
  }
};
