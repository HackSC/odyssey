const { App, LogLevel } = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

let announcement = {};

async function fetchUserInfo(userID) {
  const usr = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: userID,
  });
  return usr;
}

async function parseAnnouncement(request) {
  let responseText = "Your announcement was successfully posted!";
  const usr = await fetchUserInfo(request.body.user_id);
  if (!usr.user.is_admin) {
    responseText = "Sorry! Only Slack admins can make commands.";
    return responseText;
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
      responseText =
        "Your command was not valid. \
      Please ensure you're using one of the following commands: \
      /hacker, /admin, /sponsor, /volunteer, /superadmin, /judge";
      return responseText;
    } else {
      announcement["target"] = target;
      announcement["text"] = request.body.text;
      announcement["from"] = request.body.user_name;
      announcement["img"] = "";
    }
  }
  return responseText;
}

async function sendAnnouncement(req) {
  try {
    let url_route = req
      ? process.env.URL_BASE + "api/announcements"
      : "/api/announcements";
    await fetch(url_route, {
      method: "POST",
      body: JSON.stringify(announcement),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export default async (req, res) => {
  let port = process.env.PORT || 8080;
  await app.start(port);
  const responseText = await parseAnnouncement(req);
  await sendAnnouncement(req);
  await app.stop();
  res.json(responseText);
};
