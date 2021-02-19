import { sendSlackMessage } from "../lib";

const productionServerSlackBot = async () => {
  // * Null check slackbot tokens
  if (!process.env.SLACK_BOT_TOKEN || !process.env.SIGNING_SECRET) {
    console.error("!!!Missing SLACK BOT TOKENS!!!");
  } else if (
    process.env.URL_BASE &&
    process.env.URL_BASE.includes("dashboard")
  ) {
    // const app = new App({
    //   token: process.env.SLACK_BOT_TOKEN,
    //   signingSecret: process.env.SIGNING_SECRET,
    // });

    try {
      // await app.start(3035);

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
              sendSlackMessage(
                e.name + " starts in 10 minutes!",
                e.description,
                e.startsAt,
                e.endsAt
              );
            }
            if (
              event_start_time - curr_time > -1 &&
              event_start_time - curr_time < 1
            ) {
              sendSlackMessage(
                e.name + " starting now!",
                e.description,
                e.startsAt,
                e.endsAt
              );
            }
          });
        });
    } catch (error) {
      console.log(error);
    }

    // try {
    //   // if (app) {
    //   //   app.stop();
    //   // }
    // } catch (e) {
    //   console.log("Could not stop app");
    // }
  }
};

module.exports = productionServerSlackBot;
