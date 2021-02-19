const getPublicEvents = async (req) => {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/public/events/list"
    : /* Client */ "/api/public/events/list";

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

export { getPublicEvents };
