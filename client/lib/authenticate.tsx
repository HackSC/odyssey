export function getUser(req) {
  return req ? req.user : null;
}

export function secured(req, res, next) {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}
