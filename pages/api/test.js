import { App, LogLevel } from "@slack/bolt";
const t = process.env.SLACK_TOKEN,
  s = process.env.SIGNING_SECRET,
  app = new App({ token: t, signingSecret: s });
export default async (e, a) => {
  const { id: p, msg: s } = e.query;
  await app.start(3032),
    await app.client.chat.postMessage({ channel: p, text: s, token: t }),
    await app.stop();
};
