const express = require("express");
const http = require("http");
const next = require("next");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const bodyParser = require("body-parser");

const authRouter = require("./api/login");
const profileRouter = require("./api/hackerProfile");
const adminRouter = require("./api/admin");

const fileUpload = require("express-fileupload");

const Sentry = require("@sentry/node");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "."
});
const handle = app.getRequestHandler();

dotenv.config();

Sentry.init({
  dsn: "https://1a18ac7b9aa94cb5b2a8c9fc2f7e4fc8@sentry.io/1801129"
});

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // extraParams.id_token should contain the JWT
    return done(null, profile);
  }
);

const sessionConfig = {
  secret: process.env.COOKIE_SECRET || "We haven't secured the cookies chief",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

passport.use(strategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.prepare().then(() => {
  const server = express();

  // Authentication config
  server.use(session(sessionConfig));
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(bodyParser.json());
  server.use(fileUpload());

  server.use("/auth", authRouter);
  server.use("/api/profile", profileRouter);
  server.use("/api/admin", adminRouter);

  server.get("/dashboard/:step", (req, res) =>
    app.render(req, res, "/dashboard")
  );
  server.get("*", handle);

  const port_num = process.env.PORT || 3000;
  http.createServer(server).listen(port_num, () => {
    console.log(`listening on port ${port_num}`);
  });
});
