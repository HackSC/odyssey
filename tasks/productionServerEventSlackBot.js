const { WebClient } = require("@slack/web-api");

const SendSlackMessage = async (e, starting_phrase) => {
  const bot = new WebClient(process.env.SLACK_BOT_TOKEN);
  await bot.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.SLACK_ANNOUNCEMENTS_CHANNEL
      ? process.env.SLACK_ANNOUNCEMENTS_CHANNEL
      : "C01FUMML1JA", // * #2021-app-announcements
    text: ``,
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: `${e.name} ${starting_phrase}!`,
          emoji: true,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Description: ${e.description}\n`,
          },
          {
            type: "mrkdwn",
            text: `Starting At: ${e.startsAt}\n`,
          },
          {
            type: "mrkdwn",
            text: `Ends At: ${e.endsAt}\n`,
          },
        ],
      },
      {
        type: "divider",
      },
    ],
  });
};
const productionServerSlackBot = async () => {
  // * Null check slackbot tokens
  if (!process.env.SLACK_BOT_TOKEN || !process.env.SIGNING_SECRET) {
    console.error("!!!Missing SLACK BOT TOKENS!!!");
  } else if (
    process.env.URL_BASE &&
    process.env.URL_BASE.includes("dashboard")
  ) {
    try {
      // * Fetch event schedule from odyssey API
      fetch("https://dashboard.hacksc.com/api/public/events/list")
        .then((res) => res.json())
        .then((events) => {
          events.events.forEach((e) => {
            let curr_date_min_10 = Math.round(
              new Date().setMinutes(new Date().getMinutes() - 10) /
                (1000 * 60) -
                new Date().getTimezoneOffset()
            );
            let curr_time = Math.round(
              new Date().getTime() / (1000 * 60) -
                new Date().getTimezoneOffset()
            );

            let event_start_time = Date.parse(e.startsAt) / (1000 * 60);

            if (
              event_start_time - curr_date_min_10 > -1 &&
              event_start_time - curr_date_min_10 < 1
            ) {
              SendSlackMessage(e, "starting in 10 minutes");
            }
            if (
              event_start_time - curr_time > -1 &&
              event_start_time - curr_time < 1
            ) {
              SendSlackMessage(e, "starts now");
            }
          });
        });
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = productionServerSlackBot;
