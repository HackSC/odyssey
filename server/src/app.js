/*
  Express app setup and configuration
*/

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
import helmet from "helmet";

import { createJwtVerifierForEnv } from "./utils/auth";
import { createSessionConfigForEnv } from "./utils/server";
import cors from "cors";

import routes from "./routes";

dotenv.config();

const app = express();

const sessionConfig = createSessionConfigForEnv(app.get("env"));
const auth0Config = createJwtVerifierForEnv(app.get("env"));

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());

app.get("/amIAuthorized", auth0Config, (req, res) => {
  return res.json({
    message: "Successfully Authenticated!"
  });
});

app.use(session(sessionConfig));
app.use(helmet());
app.use("/", routes);

export default app;
