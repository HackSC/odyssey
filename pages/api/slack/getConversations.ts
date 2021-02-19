const { App, LogLevel } = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

// TODO: We should use a database, fetch the data, and update if diff
let conversationsStore = {};

async function fetchConversations() {
  try {
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
      types: "public_channel,private_channel",
    });
    saveConversations(result.channels);
  } catch (error) {
    console.error(error);
  }
}

// Put conversations into the JavaScript object
function saveConversations(conversationsArray) {
  let conversationId = "";
  conversationsArray.forEach(function (conversation) {
    conversationId = conversation["id"];
    const date = new Date(new Date(0).setUTCSeconds(conversation.created));
    // we won't need all of this
    conversationsStore[conversationId] = {
      id: conversationId,
      name: conversation.name,
      is_channel: conversation.is_channel,
      is_group: conversation.is_group,
      is_archived: conversation.is_archived,
      created: date.toLocaleDateString("en-US"),
      topic: conversation.topic,
      num_members: conversation.num_members,
      ...conversation,
    };
  });
}

export default async (req, res) => {
  await app.start(3030);
  await fetchConversations();
  await app.stop();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.json({ ...conversationsStore });
};
