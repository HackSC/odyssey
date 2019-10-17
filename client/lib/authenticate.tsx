export async function getUser(req) {
  if (!req) {
    // we're on the client
    const res = await fetch("auth/profile");
    try {
      const user = await res.json();
      return user;
    } catch (e) {
      return null;
    }
  } else {
    return req.user;
  }
  return req ? req.user : null;
}

export function secured(req, res, next) {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}
