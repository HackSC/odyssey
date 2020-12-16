async function getTeammateSuggestions(req) {

  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/teamMatching/teammate"
    : /* Client */ "/api/teamMatching/teammate";

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
    ? /* Serverside */ process.env.URL_BASE + "api/teamMatching/team"
    : /* Client */ "/api/teamMatching/team";

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

async function getPendingTeammateRequests(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/teamMatching/pendingTeammate"
    : /* Client */ "/api/teamMatching/pendingTeammate";

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

async function getPendingTeamRequests(req) {
  const urlRoute = req
  ? /* Serverside */ process.env.URL_BASE + "api/teamMatching/pendingTeam"
  : /* Client */ "/api/teamMatching/pendingTeam";

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

export { getTeammateSuggestions, getTeamSuggestions, getPendingTeammateRequests, getPendingTeamRequests };
