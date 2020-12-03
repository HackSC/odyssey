const server = require("./express");
const http = require("http");
const next = require("next");
const dotenv = require("dotenv");

const Sentry = require("@sentry/node");

const scheduleCronJobs = require("./cronjobs/cronjobs");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: ".",
});
const handle = app.getRequestHandler();

dotenv.config();

// Cron Jobs
if (!dev) {
  scheduleCronJobs();
}

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: dev ? "dev" : process.env.NODE_ENV,
  release: "odyssey@" + process.env.npm_package_version,
});

app.prepare().then(() => {
  server.all("*", handle);

  const port_num = process.env.PORT || 3000;
  http.createServer(server).listen(port_num, () => {
    console.log(`listening on port ${port_num}`);
  });
});
