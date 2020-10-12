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

export async function getAPIS(req): Promise<API> {
  let url_route = req
    ? /* Serverside */ process.env.URL_BASE + "api/apis"
    : /* Client */ "/api/apis";

  const rawAPIData = await fetch(
    url_route,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  console.log(rawAPIData);
  try {
    const data = await rawAPIData.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function getProfile(req): Promise<Profile> {
  // If we have a req object, that means we're on the server and need to pass in cookies
  // Otherwise, fetch as normal
  let url_route = req
    ? /* Serverside */ process.env.URL_BASE + "api/profile"
    : /* Client */ "/api/profile";

  //url_route.replaceAll('`', '')
  const rawProfileData = await fetch(
    url_route,
    req
      ? {
          headers: req.headers,
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
  res.redirect("/");
}

function redirectToPath(req, path: string) {
  if (req) {
    // Server side 302
    req.res.writeHead(302, {
      Location: path,
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
  redirectToPath(req, "/live");
}

export function handleAdminRedirect(req) {
  redirectToPath(req, "/admin");
}

export function handleVolunteerRedirect(req) {
  redirectToPath(req, "/volunteer");
}

export function handleSponsorRedirect(req) {
  redirectToPath(req, "/sponsor");
}
