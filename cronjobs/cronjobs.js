const cron = require("node-cron");

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
  /* Upsert to send grid once an hour */
  cron.schedule("0 * * * *", sendgridSync);

  // * Slackbot Event-based Cron Job
  cron.schedule("0 * * * * *", productionServerEventSlackBot);

  // * Better Uptime Server Heartbeats
  cron.schedule("0 0 * * * *", productionServerHeartbeat);
  cron.schedule("0 0 * * * *", stagingServerHeartbeat);

  // * Better Uptime DB Heartbeats
  cron.schedule("0 0 * * * *", productionDBHeartbeat);
  cron.schedule("0 0 * * * *", stagingDBHeartbeat);
};

module.exports = scheduleCronJobs;
