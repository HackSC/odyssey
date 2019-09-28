/*
  Used to launch server and handle networking
*/

import {
  serverNormalizePort,
  serverOnError,
  serverOnListening
} from "./utils/server";

import app from "./app";
import http from "http";

// Get port and store in Express
const port = serverNormalizePort(process.env.PORT || 8000);
app.set("port", port);

// Create HTTP Server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, function() {
  console.log("[🚀] Server launched and listening on " + server.address().port);
});

server.on("error", serverOnError);
server.on("listening", () => serverOnListening(server));
