const Auth0Strategy = require("passport-auth0");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");

const bodyParser = require("body-parser");
const authRouter = require("./api/login");
const profileRouter = require("./api/hackerProfile");
const majorEventsRouter = require("./api/majorEvents");
const apiRouter = require("./api/apis");
const adminRouter = require("./api/admin");
const taskRouter = require("./api/tasks");
const pointRouter = require("./api/points");
const teamRouter = require("./api/team");
const personRouter = require("./api/people");
const contributionRouter = require("./api/contribution");
const liveRouter = require("./api/live");
const projectTeamRouter = require("./api/projectTeam");
const eventRouter = require("./api/event");
const battlepassRouter = require("./api/unlockable");
const prizeRouter = require("./api/prizes");
const hackerLiveRouter = require("./api/hackerLive");
const publicRouter = require("./api/public");
const matchingRouter = require("./api/teamMatching");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN || "",
    clientID: process.env.AUTH0_CLIENT_ID || "",
    clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/auth/callback",
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // extraParams.id_token should contain the JWT
    return done(null, profile);
  }
);

const sessionConfig = {
  name: "session",
  keys: [process.env.COOKIE_SECRET || "We haven't secured the cookies chief"],
  maxAge: 24 * 60 * 60 * 1000,
  cookie: {
    secure: true,
    httpOnly: true,
  },
};

passport.use(strategy);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const server = express();

// Authentication config
server.use(cookieSession(sessionConfig));
server.use(passport.initialize());
server.use(passport.session());

server.use(bodyParser.json());
server.use(fileUpload());

server.use("/auth", authRouter);
server.use("/api/profile", profileRouter);
server.use("/api/majorEvents", majorEventsRouter);
server.use("/api/apis", apiRouter);
server.use("/api/admin", adminRouter);
server.use("/api/task", taskRouter);
server.use("/api/points", pointRouter);
server.use("/api/team", teamRouter);
server.use("/api/person", personRouter);
server.use("/api/contribution", contributionRouter);
server.use("/api/live", liveRouter);
server.use("/api/projectTeam", projectTeamRouter);
server.use("/api/event", eventRouter);
server.use("/api/unlockable", battlepassRouter);
server.use("/api/hacker/live", hackerLiveRouter);
server.use("/api/prize", prizeRouter);
server.use("/api/public", publicRouter);
server.use("/api/teamMatching", matchingRouter);

server.post("/api/scan", (req, res) => {
  console.info("Scanned: ", req.body.code);
  return res.json({ message: "Received" });
});

server.use("/admin/auth", authRouter);
server.use("/admin/api/profile", profileRouter);
server.use("/admin/api/majorEvents", majorEventsRouter);
server.use("/admin/api/apis", apiRouter);
server.use("/admin/api/admin", adminRouter);
server.use("/admin/api/task", taskRouter);
server.use("/admin/api/points", pointRouter);
server.use("/admin/api/team", teamRouter);
server.use("/admin/api/person", personRouter);
server.use("/admin/api/contribution", contributionRouter);
server.use("/admin/api/live", liveRouter);
server.use("/admin/api/projectTeam", projectTeamRouter);
server.use("/admin/api/event", eventRouter);
server.use("/admin/api/unlockable", battlepassRouter);
server.use("/admin/api/hacker/live", hackerLiveRouter);
server.use("/admin/api/prize", prizeRouter);
server.use("/admin/api/public", publicRouter);

server.post("/admin/api/scan", (req, res) => {
  console.info("Scanned: ", req.body.code);
  return res.json({ message: "Received" });
});

module.exports = server;
