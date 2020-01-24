const server = require("./express");
const http = require("http");
const next = require("next");
const dotenv = require("dotenv");

const Sentry = require("@sentry/node");

const scheduleCronJobs = require("./cronjobs/cronjobs");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "."
});
const handle = app.getRequestHandler();

dotenv.config();

// Cron Jobs
if (!dev) {
  scheduleCronJobs();
}

Sentry.init({
  dsn: "https://1a18ac7b9aa94cb5b2a8c9fc2f7e4fc8@sentry.io/1801129",
  environment: dev ? "dev" : process.env.NODE_ENV
});

app.prepare().then(() => {
  server.get("*", handle);

  const port_num = process.env.PORT || 3000;
  http.createServer(server).listen(port_num, () => {
    console.log(`listening on port ${port_num}`);
  });
});
