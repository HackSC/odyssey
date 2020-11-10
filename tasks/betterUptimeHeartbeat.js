const betterUptimeHeartbeat = async () => {
  let betteruptime_heartbeat_url =
    "https://betteruptime.com/api/v1/heartbeat/rT5k5ZpriuRa27Lu1sMPJfAZ";

  const res = await fetch(betteruptime_heartbeat_url);

  return res;
};
