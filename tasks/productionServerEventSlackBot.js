const { App } = require("@slack/bolt");

const SendSlackMessage = async (e, app, starting_phrase) => {
  try {
    await app.client.chat.postMessage({
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
  } catch (msg_error) {
    console.error("Could not send slackbot message: ", msg_error);
  }
};

const productionServerSlackBot = async () => {
  // * Null check slackbot tokens
  if (!process.env.SLACK_BOT_TOKEN || !process.env.SIGNING_SECRET) {
    console.error("!!!Missing SLACK BOT TOKENS!!!");
  } else if (process.env.URL_BASE && process.env.URL_BASE.includes("staging")) {
    const app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SIGNING_SECRET,
    });

    try {
      await app.start(3035);

      // * Fetch event schedule from odyssey API
      fetch("https://staging.hacksc.com/api/public/events/list")
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

            //console.log(e)
            if (
              event_start_time - curr_date_min_10 > -1 &&
              event_start_time - curr_date_min_10 < 1
            ) {
              SendSlackMessage(e, app, "starting in 10 minutes");
            }
            if (
              event_start_time - curr_time > -1 &&
              event_start_time - curr_time < 1
            ) {
              SendSlackMessage(e, app, "starts now");
            }
          });
        });
    } catch (error) {
      console.log(error);
    }

    try {
      if (app) {
        app.stop();
      }
    } catch (e) {
      console.log("Could not stop app");
    }
  }
};

module.exports = productionServerSlackBot;
