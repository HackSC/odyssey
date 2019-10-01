/*
  Express app setup and configuration
*/

import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import dotenv from 'dotenv';
import helmet from 'helmet';

import api from "./routes/api";

dotenv.config();

const app = express();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUnitialized: true,
};

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Hello world"
  });
});

app.use(session(sessionConfig));
app.use(helmet());
app.use("/api", api);

export default app;
