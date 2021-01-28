const { App, LogLevel } = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

// Fetch users using the users.list method
async function sendAnnouncement(conversationId, announcement) {
  try {
    const res = await app.message({
      channel: conversationId,
      text: announcement,
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

export default async (req, res) => {
  const conversationIds = req.body.conversationIds;
  const announcement = req.body.announcement;

  for (var i = 0; i < conversationIds.length; i++) {
    var conversationId = conversationIds[i];
    await sendAnnouncement(conversationId, announcement);
  }

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
};
