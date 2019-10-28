import Router from "next/router";

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

function redirectToPath(req, path: string) {
  if (req) {
    // Server side 302
    req.res.writeHead(302, {
      Location: path
    });
    req.res.end();
  } else {
    // Client side redirect
    Router.push(path);
  }
}

export function handleLoginRedirect(req) {
  redirectToPath(req, "/login");
}

export function handleDashboardRedirect(req) {
  redirectToPath(req, "/dashboard");
}
