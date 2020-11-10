const productionServerHeartbeat = async () => {
  if (process.env.URL_BASE && process.env.URL_BASE.includes("dashboard")) {
    fetch(
      "https://betteruptime.com/api/v1/heartbeat/dZxGUymyrmjcLw1gjFFuBjMu"
    ).then((res) => {
      console.log(
        "Successfully sent production heroku heartbeat to Better Uptime."
      );
    });
  }
};

module.exports = productionServerHeartbeat;
