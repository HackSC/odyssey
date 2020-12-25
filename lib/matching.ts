async function getTeammateSuggestions(req, owner: String) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE +
      "api/teamMatching/" +
      owner +
      "/teammate"
    : /* Client */ "api/teamMatching/" + owner + "/teammate";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers,
        }
      : null
  );
  return await result.json();
}

async function getTeamSuggestions(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/teamMatching/hacker/team"
    : /* Client */ "/api/teamMatching/hacker/team";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers,
        }
      : null
  );
  return await result.json();
}

async function getPendingRequests(req, owner: String) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE +
      "api/teamMatching/" +
      owner +
      "/pendingRequests"
    : /* Client */ "/api/teamMatching/" + owner + "/pendingRequests";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  return await result.json();
}

async function getPendingInvites(req, owner: String) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE +
      "api/teamMatching/" +
      owner +
      "/pendingInvites"
    : /* Client */ "/api/teamMatching/" + owner + "/pendingInvites";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  return await result.json();
}

async function requestTeam(req) {
  const urlRoute = "/api/teamMatching/request/";
  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers,
          method: "POST",
        }
      : null
  );
  return result.status === 200;
}

export {
  getTeammateSuggestions,
  getTeamSuggestions,
  getPendingRequests,
  getPendingInvites,
  requestTeam,
};
