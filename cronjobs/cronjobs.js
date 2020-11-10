const cron = require("node-cron");

const sendgridSync = require("../tasks/sendgridsync");
const betterUptimeHeartbeat = require("../tasks/betterUptimeHeartbeat");

const scheduleCronJobs = () => {
  /* Upsert to send grid once an hour */
  cron.schedule("0 * * * *", sendgridSync);
  cron.schedule("59 23 * * *", betterUptimeHeartbeat);
};

module.exports = scheduleCronJobs;
