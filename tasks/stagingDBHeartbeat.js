const mysql = require("serverless-mysql");

const stagingDBHeartbeat = async () => {
  if (process.env.URL_BASE && process.env.URL_BASE.includes("staging")) {
    // * Create connection to db
    let db = mysql({
      config: {
        host: process.env.PROD_DB_HOSTNAME,
        database: process.env.PROD_DB_NAME,
        user: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
      },
    });

    // * Connect and send heartbeat if successful
    db.connect()
      .then((result) => {
        fetch(
          "https://betteruptime.com/api/v1/heartbeat/VpAPbQ74DA9MJ4ffvqhYo9cT"
        ).then((res) => {
          console.info(
            "Successfully sent staging digital ocean heartbeat to Better Uptime."
          );
        });
      })
      .finally(async () => {
        try {
          // Perform connection management tasks
          await db.end();
          // Gracefully terminate the connection
          db.quit();
        } catch (e) {
          console.error(
            "Failed to close and terminate staging db heartbeat mysql connection."
          );
        }
      });
  }
};

module.exports = stagingDBHeartbeat;
