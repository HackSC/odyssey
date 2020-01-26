var express = require("express");
var passport = require("passport");
var util = require("util");
var url = require("url");
var querystring = require("querystring");
var router = express.Router();

var secured = function(req, res, next) {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/");
};

router.get("/devlogin", function(req, res) {
  //Block in prod
  if (process.env.NODE_ENV == "production") {
    return res.redirect("/");
  }

  req.logout();
  const { id, role } = req.query;
  const user = {
    id,
    role,
    _json: { email: "", email_verified: true }
  };

  req.logIn(user, function(err) {
    if (err) {
      res.status(400).send(err);
    }
    res.json(user);
  });
});

router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get("/callback", function(req, res, next) {
  passport.authenticate("auth0", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect("/dashboard");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  var returnTo = req.protocol + "://" + req.hostname;
  const port = req.connection.localPort;
  if (
    port !== undefined &&
    req.hostname == "localhost" &&
    port !== 80 &&
    port !== 443
  ) {
    returnTo += ":" + port;
  }
  var logoutURL = new url.URL(
    util.format("https://%s/logout", process.env.AUTH0_DOMAIN)
  );
  var searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

router.get("/needAuth", secured, function(req, res, next) {
  res.send("Hey, you're authenticated!");
});

router.get("/profile", secured, function(req, res, next) {
  if (!req.user) {
    res.json(403, { message: "No User is logged in" });
  } else {
    res.json(req.user);
  }
});

module.exports = router;
