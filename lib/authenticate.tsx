import Router from "next/router";
import fetch from "isomorphic-unfetch";

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
}

export async function getProfile(req) {
  // If we have a req object, that means we're on the server and need to pass in cookies
  // Otherwise, fetch as normal
  const rawProfileData = await fetch(
    "http://localhost:3000/api/profile",
    req
      ? {
          headers: req.headers
        }
      : null
  );

  try {
    const data = await rawProfileData.json();
    return data.hackerProfile;
  } catch (e) {
    return null;
  }
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
  redirectToPath(req, "/auth/login");
}

export function handleDashboardRedirect(req) {
  redirectToPath(req, "/dashboard");
}
