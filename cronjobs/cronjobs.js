const cron = require("node-cron");

const sendgridSync = require("../tasks/sendgridsync");

// * Uptime Server Heartbeats
const productionServerHeartbeat = require("../tasks/productionServerHeartbeat");
const stagingServerHeartbeat = require("../tasks/stagingServerHeartbeat");

// * Uptime Database Heartbeats
// TODO

const scheduleCronJobs = () => {
  /* Upsert to send grid once an hour */
  cron.schedule("0 * * * *", sendgridSync);

  // * Uptime Server Heartbeats
  cron.schedule("0 0 * * * *", productionServerHeartbeat);
  cron.schedule("0 0 * * * *", stagingServerHeartbeat);
};

module.exports = scheduleCronJobs;
