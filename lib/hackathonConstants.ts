import moment from "moment-timezone";

export default {
  hackathonDate: moment(1613754000000, false).tz(moment.tz.guess()),
  hackathonEndDate: moment(1613898000000, false).tz(moment.tz.guess()),
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

export async function updateHackathonConstant({
  id,
  name,
  boolean,
  date,
  type,
}) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/constants/update"
    : "api/constants/update";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      boolean: boolean,
      date: date,
      type: type,
    }),
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

export async function createHackathonConstant({ name, boolean, date, type }) {
  let fetchUrl = process.env.URL_BASE
    ? /* Serverside */ process.env.URL_BASE + "api/constants/new"
    : /* Client */ "/api/constants/new";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      boolean: boolean,
      date: date,
      type: type,
    }),
  });

  try {
    const data = await response.json();
    return data.result;
  } catch (e) {
    return null;
  }
}
