const { App } = require("@slack/bolt");
const getPort = require("get-port");

const CreateSlackApp = async () => {
  let SlackApp = null;
  // * Slackbot Event-based Cron Job
  if (!process.env.SLACK_BOT_TOKEN || !process.env.SIGNING_SECRET) {
    console.error("!!!Missing SLACK BOT TOKENS!!!");
  } else if (
    process.env.URL_BASE &&
    process.env.URL_BASE.includes("localhost")
  ) {
    SlackApp = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SIGNING_SECRET,
    });

    try {
      (async (SlackApp) => {
        let port_num = await getPort();
        await SlackApp.start(port_num);
      })(SlackApp);
    } catch (e) {
      console.log("App failed to bind to port");
    }
  }

  return SlackApp;
};

module.exports = {
  CreateSlackApp,
};
