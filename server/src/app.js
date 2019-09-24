/*
  Express app setup and configuration
*/

import express from "express";
import bodyParser from "body-parser";

import api from "./routes/api";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Hello world"
  });
});

app.use("/api", api);

export default app;
