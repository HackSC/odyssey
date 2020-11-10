const stagingServerHeartbeat = async () => {
  if (process.env.HEROKU_APP_NAME.includes("staging")) {
    fetch(
      "https://betteruptime.com/api/v1/heartbeat/u1po3JoaJEZmCmgtcWMD6n4x"
    ).then((res) => {
      console.log("Successfully sent staging heartbeat to Better Uptime.");
    });
  }
};

module.exports = stagingServerHeartbeat;
