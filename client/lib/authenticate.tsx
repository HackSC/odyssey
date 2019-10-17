export async function getUser(req) {
  if (!req) {
    // we're on the client
    const res = await fetch("auth/me");
    if (res.status != 200) {
      return null;
    }
    const user = await res.json();
    console.log(user);
    return user;
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
