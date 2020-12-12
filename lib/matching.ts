async function getTeammateSuggestions(req) {
  // const urlRoute = req
  //   ? /* Serverside */ process.env.URL_BASE + "api/team/"
  //   : /* Client */ "api/team/";
  // //   const res = await fetch("/api/team/suggestions");
  // console.log("REACHED", urlRoute);
  // const results = await fetch(urlRoute);
  // console.log(results);
  // return await results.json();

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
