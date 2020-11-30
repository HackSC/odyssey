const mysql = require("serverless-mysql");

const productionDBHeartbeat = async () => {
  if (process.env.URL_BASE && process.env.URL_BASE.includes("dashboard")) {
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
          "https://betteruptime.com/api/v1/heartbeat/72ugu3ZQLdPWrE7ML2ks7rhE"
        ).then((res) => {
          console.info(
            "Successfully sent production digital ocean heartbeat to Better Uptime."
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
            "Failed to close and terminate production db heartbeat mysql connection."
          );
        }
      });
  }
};

module.exports = productionDBHeartbeat;
