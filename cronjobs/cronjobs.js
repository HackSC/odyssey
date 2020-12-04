const cron = require("node-cron");
const { CreateSlackApp } = require("../tasks/slackapp");

const sendgridSync = require("../tasks/sendgridsync");

// * Slackbot Event-based Cron Job
const productionServerEventSlackBot = require("../tasks/productionServerEventSlackBot");

// * Uptime Server Heartbeats
const productionServerHeartbeat = require("../tasks/productionServerHeartbeat");
const stagingServerHeartbeat = require("../tasks/stagingServerHeartbeat");

// * Uptime Database Heartbeats
const productionDBHeartbeat = require("../tasks/productionDBHeartbeat");
const stagingDBHeartbeat = require("../tasks/stagingDBHeartbeat");

const scheduleCronJobs = async () => {
  let app = await CreateSlackApp();

  /* Upsert to send grid once an hour */
  cron.schedule("0 * * * *", sendgridSync);

  // * Slackbot Event-based Cron Job
  cron.schedule("0 * * * * *", () => productionServerEventSlackBot(app));

  // * Better Uptime Server Heartbeats
  cron.schedule("0 0 * * * *", productionServerHeartbeat);
  cron.schedule("0 0 * * * *", stagingServerHeartbeat);

  // * Better Uptime DB Heartbeats
  cron.schedule("0 0 * * * *", productionDBHeartbeat);
  cron.schedule("0 0 * * * *", stagingDBHeartbeat);
};

module.exports = scheduleCronJobs;
