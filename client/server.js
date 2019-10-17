const express = require("express");
const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "."
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // handling everything else with Next.js
  server.get("*", handle);
  const port_num = 3000;
  http.createServer(server).listen(port_num, () => {
    console.log(`listening on port ${port_num}`);
  });
});
