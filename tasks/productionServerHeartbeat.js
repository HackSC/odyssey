const productionServerHeartbeat = async () => {
  if (process.env.HEROKU_APP_NAME.includes("production")) {
    fetch(
      "https://betteruptime.com/api/v1/heartbeat/dZxGUymyrmjcLw1gjFFuBjMu"
    ).then((res) => {
      console.log("Successfully sent production heartbeat to Better Uptime.");
    });
  }
};

module.exports = productionServerHeartbeat;
