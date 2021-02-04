import { App, LogLevel } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
});

let announcement = {};

async function fetchUserInfo(userID) {
  const usr = await app.client.users.info(userID);
  return usr;
}

async function parseAnnouncement(request) {
  const usr = await fetchUserInfo(request.body.user_id);
  if (!usr.user.is_admin) {
    const res = await app.message({
      channel: request.body.channel_id,
      text: "Sorry! Only Slack admins can make commands.",
    });
  } else {
    const cmd = request.body.command;
    const target = cmd.replace("/", "");
    let roles = [
      "hacker",
      "admin",
      "sponsor",
      "volunteer",
      "superadmin",
      "judge",
    ];
    let isValid = false;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] == target) {
        isValid = true;
        break;
      }
    }
    if (!isValid) {
      const errorText =
        "Your command was not valid. \
      Please ensure you're using one of the following commands: \
      /hacker, /admin, /sponsor, /volunteer, /superadmin, /judge";
      try {
        const res = await app.message({
          channel: request.body.channel_id,
          text: errorText,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      announcement["target"] = target;
      announcement["text"] = request.body.text;
      announcement["from"] = request.body.user_name;
      announcement["img"] = "";
    }
  }
}

export default async (req, res) => {
  await app.start(3032);
  try {
    await parseAnnouncement(req);
    res.json(announcement);
  } catch (error) {
    console.error(error);
    res.end(500);
  }
};
