const cron = require("node-cron");

const sendgridSync = require("../tasks/sendgridsync");

// * Uptime Server Heartbeats
const productionServerHeartbeat = require("../tasks/productionServerHeartbeat");
const stagingServerHeartbeat = require("../tasks/stagingServerHeartbeat");

// * Uptime Database Heartbeats
const productionDBHeartbeat = require("../tasks/productionDBHeartbeat");
const stagingDBHeartbeat = require("../tasks/stagingDBHeartbeat");

const scheduleCronJobs = () => {
  /* Upsert to send grid once an hour */
  cron.schedule("0 * * * *", sendgridSync);

  // * Better Uptime Server Heartbeats
  cron.schedule("0 0 * * * *", productionServerHeartbeat);
  cron.schedule("0 0 * * * *", stagingServerHeartbeat);

  // * Better Uptime DB Heartbeats
  cron.schedule("0 0 * * * *", productionDBHeartbeat);
  cron.schedule("0 0 * * * *", stagingDBHeartbeat);
};

module.exports = scheduleCronJobs;
