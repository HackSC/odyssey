const stagingServerHeartbeat = async () => {
  if (process.env.URL_BASE && process.env.URL_BASE.includes("staging")) {
    fetch(
      "https://betteruptime.com/api/v1/heartbeat/u1po3JoaJEZmCmgtcWMD6n4x"
    ).then((res) => {
      console.info(
        "Successfully sent staging heroku heartbeat to Better Uptime."
      );
    });
  }
};

module.exports = stagingServerHeartbeat;
