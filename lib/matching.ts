async function getTeammateSuggestions(req) {

  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/teamMatching"
    : /* Client */ "/api/teamMatching";

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

export { getTeammateSuggestions };
