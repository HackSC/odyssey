const getPrizes = async (req) => {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/prize"
    : /* Client */ "/api/prize";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers,
        }
      : null
  );
  return await result.json();
};

export { getPrizes };
