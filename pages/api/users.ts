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
  res.redirect("/login");
};

export { secured };