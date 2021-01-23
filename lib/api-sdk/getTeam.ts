async function getTeam(req): Promise<Team> {
  // If we have a req object, that means we're on the server and need to pass in cookies
  // Otherwise, fetch as normal
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/team"
    : /* Client */ "/api/team";
  const rawTeamData = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  try {
    const data = await rawTeamData.json();

    if (data.team) {
      return data.team;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

export default getTeam;
