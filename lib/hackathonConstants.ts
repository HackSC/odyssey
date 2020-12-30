export default {
  showLive: false, // * False until event or soon before
  showDash: false,
  showApp: true, // * True until Dec. 14ish
  showMaps: false, // * False because HackSC 2021 is virtual :( big sad
  showAPI: false, // * False until event
  showResults: true,
  needsBus: false, // * False because HackSC 2021 is virtual :( big sad
  showTeam: false, // * False until closer to event
  showProjectTeam: false, // * False until closer to event
  appsCloseDate: new Date("12/21/20"),
};

export async function getHackathonConstants(): Promise<
  Array<HackathonConstant>
> {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/constants/"
    : "api/constants/";

  const response = await fetch(fetchUrl, {
    method: "GET",
  });

  const data = await response.json();
  return data.result;
}

export async function updateHackathonConstant({ id, name, boolean, date }) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/constants/update"
    : "api/constants/update";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, name: name, boolean: boolean, date: date }),
  });

  return response;
}

export async function deleteHackathonConstant({ id }) {
  let fetchUrl = process.env.URL_BASE
    ? /* Serverside */ process.env.URL_BASE + "api/constants/delete"
    : /* Client */ "/api/constants/delete";

  const response = await fetch(fetchUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  try {
    const data = await response.json();
    return data.result;
  } catch (e) {
    return null;
  }
}

export async function createHackathonConstant({ id, name, boolean, date }) {
  let fetchUrl = process.env.URL_BASE
    ? /* Serverside */ process.env.URL_BASE + "api/constants/new"
    : /* Client */ "/api/constants/new";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, name: name, boolean: boolean, date: date }),
  });

  try {
    const data = await response.json();
    return data.result;
  } catch (e) {
    return null;
  }
}
