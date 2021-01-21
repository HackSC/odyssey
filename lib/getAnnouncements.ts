export async function getAnnouncements(req): Promise<Array<Announcement>> {
  let url_route = req
    ? /* Serverside */ process.env.URL_BASE + "api/announcements"
    : /* Client */ "/api/announcements";

  const rawAnnouncementData = await fetch(
    url_route,
    req
      ? {
          headers: req.headers,
        }
      : null
  );
  try {
    const data = await rawAnnouncementData.json();
    return data.announcements;
  } catch (e) {
    return null;
  }
}
