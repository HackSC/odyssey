export async function getAnnouncements(
  req,
  profile
): Promise<Array<Announcement>> {
  let url_route;
  try {
    url_route = req
      ? /* Serverside */ process.env.URL_BASE +
        "api/announcements/" +
        profile.role
      : /* Client */ "/api/announcements/" + profile.role;
  } catch (e) {
    url_route = req
      ? /* Serverside */ process.env.URL_BASE + "api/announcements"
      : /* Client */ "/api/announcements";
  }
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
