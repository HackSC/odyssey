const cron = require("node-cron");

const sendgridSync = require("../tasks/sendgridsync");

const scheduleCronJobs = () => {
  /* Upsert to send grid once an hour */
  cron.schedule("0 * * * *", sendgridSync);
};

module.exports = scheduleCronJobs;
